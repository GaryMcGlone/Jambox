import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
import { DatabaseService } from "../database/database.service";
import { ToastController } from "@ionic/angular";
import { IUser } from "../../interfaces/user-interface";
import { AngularFirestore } from "@angular/fire/firestore";
import { SpotifyService } from "../spotify/spotify.service";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { NotificationService } from "../notifications/notification.service";

@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<IUser>;
  loggedInStatus: boolean = false;

  constructor(private _afAuth: AngularFireAuth,
      private router: Router,
       private dbService: DatabaseService,
       private toastCtrl: ToastController,
        private spotifyService: SpotifyService,
         private gPlus: GooglePlus,
         private notificationService: NotificationService) {}

  signInWithGoogle() {
    this.gPlus
      .login({
        scopes: "", // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        webClientId:
          "291849800543-6iahbke8rn6cqoejhft4nq5ekcaubdp0.apps.googleusercontent.com", // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        offline: true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      })
      .then(
        () => {
          console.log("logged in");
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
  async signInWithGoogle(): Promise<any> {

    const gplusUser = await this.gPlus.login({
      'webClientId': '291849800543-6iahbke8rn6cqoejhft4nq5ekcaubdp0.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })

    console.log("bouta log in with google")
    return await this._afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  }
 */
  stayLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedInStatus = true;
        this.router.navigate([""]);
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  signUp(email: string, password: string, displayName: string) {
    this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        let user: IUser = {
          uid: res.user.uid,
          email: email,
          displayName: displayName
        };
        this.dbService.addUser(user);
        this.router.navigate(["login"]);
      })
      .catch(err => {
        this.presentToast(err.message);
      });
  }

  async doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          res => {
            resolve(res);
            this.loggedInStatus = true;
            this.router.navigate([""]);
            this.notificationService.startNotifications()
          },
          err => reject(err)
        );
    }).catch(err => {
      this.presentToast(err.message);
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.spotifyService.loggedIn) {
        this.spotifyService.logout();
        firebase.auth().signOut();
        this.loggedInStatus = false;
        this.router.navigate(["login"]);
      } else {
        firebase.auth().signOut();
        this.loggedInStatus = false;
        this.router.navigate(["login"]);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  getCurrentUserID(): string {
    return firebase.auth().currentUser.uid;
  }

  
}
