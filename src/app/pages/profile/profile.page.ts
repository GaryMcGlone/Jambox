import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profilePicture: any = null;
  userBio: string;
  constructor(private auth: FirebaseAuthService, private menuCtrl: MenuController, private db: DatabaseService, private router: Router, private camera: Camera, private file: File, private imagePicker: ImagePicker) { }
  ngOnInit() {
    this.loadProfilePictureURL();
    this.db.getCurrentUser().subscribe(data => {
      this.userBio = data.boi
    })
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
