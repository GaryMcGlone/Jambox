import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';
import { IPost } from '../../interfaces/post-interface';
import { IFollow } from '../../interfaces/follow.interface';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  followersCounter: number;
  followingCounter: number;
  postsCounter: number;
  profilePicture: any = null;
  userBio: string;
  userBioEmpty: boolean = false;
  posts: IPost[];
  toggled:boolean = false;
  buttonIsDisabled: boolean = true;
  following: IFollow[];
  followers: IFollow[];
  username: string;
  memberSince: Date;
  yourPostsSelect: boolean = true;
  likedPostsSelect: boolean = false;
  constructor(
          private auth: FirebaseAuthService, 
          private menuCtrl: MenuController, 
          private db: DatabaseService, 
          private router: Router, 
          private camera: Camera, 
          private file: File, 
          private imagePicker: ImagePicker,
          private followService: FollowService,
         // private analytics: AnalyticsService
          ) { }
  ngOnInit() {
    console.log("before load prof pic")
    this.loadProfilePictureURL();
    console.log("after load prof pic")
    this.db.getCurrentUser().subscribe(data => {
      console.log("in get current user sub")
      this.userBio = data.bio
      this.username = data.displayName
      this.memberSince = this.toDateTime(data.createdAt.seconds);
      if(this.userBio == null || this.userBio == ''){
        this.userBioEmpty = true;}
      console.log("in get current user sub 2")
    })
    this.db.getLoggedInUserPosts().subscribe(posts => {
      console.log("in get user posts")
      this.posts = posts
      this.postsCounter = this.posts.length
      console.log("in get user posts 2")
    });
    this.followService.getFollowedUsers().subscribe(following => {
      console.log("in get followed users")
      this.following = following
      this.followingCounter = this.following.length
      console.log("in get followed users 2")
    });
    this.followService.getFollowingUsers(this.auth.getCurrentUserID()).subscribe(followers => {
      console.log("in get user followers")
      this.followers = followers
      this.followersCounter = this.followers.length
      console.log("in get user followers 2")
    })
    console.log("END OF NGONINIT")
  }

  segmentChanged(event: any) {
    console.log("in segment changed", event.target.value)
    switch (event.target.value) {
      case "yourposts":
        this.yourPostsSelect = true;
        this.likedPostsSelect = false;
        break;
      case "likedposts":
      this.yourPostsSelect = false;
      this.likedPostsSelect = true;
        break;
    }
    console.log("value yourpostsselect: ", this.yourPostsSelect)
    console.log("value likedpostsselect: ", this.likedPostsSelect)
  }

  toDateTime(secs:number) {
    console.log("to datetime")
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  updateBio($event) {
    this.userBio = $event.target.value;

    if(this.userBio == ' ' || this.userBio == null){
      this.userBioEmpty = true;
    }else{
      this.userBioEmpty = false;}
  }

  loadProfilePictureURL() {
    console.log("in load profile picture url")
    this.db.getProfilePictureURL().then(data => {
      if (data) {
        console.log("in load profile picture url/ if statement")
        this.profilePicture = data
      }
    })
  }

  ionViewWillEnter() {
    console.log("in ionviewwillenter")
    this.menuCtrl.enable(true);
  }

  signOut() {
    //this.analytics.log("signedOut", { param: "Signed_Out" })
    this.auth.doLogout();
  }
  getFollowers() {

  }
  navigateToSettings() {
    this.router.navigate(['settings'])
  }

  async takePicture() {
    console.log("in take picture")
    //this.analytics.log("tookProfilePic", { param: "Pic_Taken" })
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1000,
      targetWidth: 1000
    };
    let cameraInfo = await this.camera.getPicture(options);
    console.log("end in take pic before make blob")
    this.makeImageIntoImageBlob(cameraInfo)
  }

  async selectImageFromGallery() {
    console.log("in select image from gallery")
  //  this.analytics.log("filePickerProfilePic", { param: "file_Picker" })
    const options: ImagePickerOptions = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      console.log("in select image from gallery before for loop")
      for (var i = 0; i < results.length; i++) {
        console.log("in select image from gallery before for loop counter: ", i)
        this.makeImageIntoImageBlob(results[i])
      }
    }, (err) => { });

  }

  saveBio(){
    //this.analytics.log("BioSaved", { param: "Bio_Saved" })
    if(this.userBio != null && this.userBio != '' && this.userBio != ' ')
      this.db.updateBio(this.userBio)
  }

  makeImageIntoImageBlob(imagePath) {
    console.log("in blob imagepath:", imagePath);
    return new Promise((resolve, reject) => {
      console.log("START promise")
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          let filePath = nativeURL
            .substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          return this.file.readAsArrayBuffer(filePath, name);
        })
        .then(buffer => {
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          this.db.storeProfilePicture(imgBlob)
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
        console.log("END promise")
    });
  }
}
