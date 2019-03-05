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
import { IUser } from '../../interfaces/user-interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private followersCounter: number;
  private followingCounter: number;
  private postsCounter: number;

  private defaultPic: string = "../../assets/icon/defaultProfilePic.jpg"
  private memberSince: Date;
  
  private yourPostsSelect: boolean = true;
  private likedPostsSelect: boolean = false;
  private user: IUser;
  private editing: false;
  
  constructor(private auth: FirebaseAuthService, private menuCtrl: MenuController, private db: DatabaseService, private router: Router, private camera: Camera, private file: File, private imagePicker: ImagePicker, private followService: FollowService,
    // private analytics: AnalyticsService
  ) { }
  ngOnInit() {
    this.db.getCurrentUser().subscribe(data => {
      this.user = data
      this.memberSince = this.toDateTime(data.createdAt.seconds);
    })
    this.db.getLoggedInUserPosts().subscribe(posts => {
      this.postsCounter = posts.length
    });
    this.followService.getFollowedUsers().subscribe(following => {
      this.followingCounter = following.length
    });
    this.followService.getFollowingUsers(this.auth.getCurrentUserID()).subscribe(followers => {
      this.followersCounter = followers.length
    })
  }

  segmentChanged(event: any) {
    switch (event.target.value) {
      case "posts":
        this.yourPostsSelect = true;
        this.likedPostsSelect = false;
        break;
      case "likes":
        this.yourPostsSelect = false;
        this.likedPostsSelect = true;
        break;
    }
  }

  toDateTime(secs: number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  saveBio(bio) {
    this.editing = false;
    console.log("saving", bio)
    this.db.updateBio(bio)
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  signOut() {
    //this.analytics.log("signedOut", { param: "Signed_Out" })
    this.auth.doLogout();
  }

  navigateToSettings() {
    this.router.navigate(['settings'])
  }

  async takePicture() {
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
    this.makeImageIntoImageBlob(cameraInfo)
  }

  async selectImageFromGallery() {
    //  this.analytics.log("filePickerProfilePic", { param: "file_Picker" })
    const options: ImagePickerOptions = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.makeImageIntoImageBlob(results[i])
      }
    }, (err) => { });

  }

  makeImageIntoImageBlob(imagePath) {
    return new Promise((resolve, reject) => {
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
    });
  }
}