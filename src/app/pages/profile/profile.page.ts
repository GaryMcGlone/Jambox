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
  following: IFollow[];
  followers: IFollow[];
  username: string;
  memberSince: Date;
  constructor(
          private auth: FirebaseAuthService, 
          private menuCtrl: MenuController, 
          private db: DatabaseService, 
          private router: Router, 
          private camera: Camera, 
          private file: File, 
          private imagePicker: ImagePicker,
          private followService: FollowService) { }
  ngOnInit() {
    this.loadProfilePictureURL();
    this.db.getCurrentUser().subscribe(data => {
      this.userBio = data.bio
      this.username = data.displayName
      this.memberSince = this.toDateTime(data.createdAt.seconds);
      if(this.userBio == null || this.userBio == '')
        this.userBioEmpty = true;
    })
    this.db.getLoggedInUserPosts().subscribe(posts => {
      this.posts = posts
      this.postsCounter = this.posts.length
    });
    this.followService.getFollowedUsers().subscribe(following => {
      this.following = following
      this.followingCounter = this.following.length
    });
    this.followService.getFollowingUsers(this.auth.getCurrentUserID()).subscribe(followers => {
      this.followers = followers
      this.followersCounter = this.followers.length
    })
  }

  toDateTime(secs:number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  updateBio($event) {
    this.userBio = $event.target.value;
    if(this.userBio == '' || this.userBio == null)
      this.userBioEmpty = true;
    else
      this.userBioEmpty = false;
  }

  toggleBtn() {
    if(this.toggled == false)
      this.toggled = true;
    else 
      this.toggled = false;
  }

  loadProfilePictureURL() {
    this.db.getProfilePictureURL().then(data => {
      if(data) {
        this.profilePicture = data
      }
    })
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  signOut() {
    this.auth.doLogout();
  }
  getFollowers() {

  }
  navigateToSettings() {
    this.router.navigate(['settings'])
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 1000,
      targetWidth: 1000
    };
    let cameraInfo = await this.camera.getPicture(options);
    this.makeFileIntoBlob(cameraInfo)
  }

  async selectImageFromGallery() {

    const options: ImagePickerOptions = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.makeFileIntoBlob(results[i])
      }
    }, (err) => { });

  }

  saveBio(){
    this.db.updateBio(this.userBio)
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;
          let path = nativeURL
            .substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;
          return this.file.readAsArrayBuffer(path, name);
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
    });
  }
}
