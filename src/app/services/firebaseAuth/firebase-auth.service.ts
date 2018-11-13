import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
import { DatabaseService } from "../database/database.service";
import { ToastController, MenuController, Platform } from "@ionic/angular";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { switchMap } from "rxjs/operators";
import { IUser } from "../../interfaces/user-interface";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<IUser>;
  loggedInStatus: boolean = false;

  constructor(
    private _afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private dbService: DatabaseService,
    private toastCtrl: ToastController
  ) {
    this.user = this._afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log('a user', this.afs.doc<IUser>(`users/${user.uid}`).valueChanges())
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return null;
        }
      })
    );
  }

  stayLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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

        this.sendEmailVerification();
        this.presentToast("Email verification sent");
        this.router.navigate(["login"]);
      })
      .catch(err => {
        this.presentToast(err.message);
      });
  }

  sendEmailVerification() {
    this._afAuth.authState.subscribe(user => {
      user
        .sendEmailVerification()
        .then(() => {})
        .catch(err => {
          this.presentToast(err.message);
        });
    });
  }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          res => {
            console.log(res);
            resolve(res);
            this.loggedInStatus = true;
            this.router.navigate([""]);
          },
          err => reject(err)
        );
    }).catch(err => {
      this.presentToast(err.message);
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut();
      this.loggedInStatus = false;
      this.router.navigate(["login"]);
    });
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  getCurrentUserID(): string {
    return firebase.auth().currentUser.uid;
  }
}
