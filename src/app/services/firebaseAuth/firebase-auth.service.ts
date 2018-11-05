import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
import { DatabaseService } from "../database/database.service";
import { ToastController } from "@ionic/angular";
@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<firebase.User>;
  loggedInStatus: boolean = false;

  constructor(
    private _afs: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService,
    private toastCtrl: ToastController
  ) {
    this.user = _afs.authState;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  signUp(email: string, password: string, name: string) {
    this._afs.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.dbService.storeUser(email, res.user.uid, name);
        this.sendEmailVerification();
        this.presentToast("email verification sent");
        this.router.navigate(["login"]);
      })
      .catch(err => {
        this.presentToast(err.message);
      });
  }

  sendEmailVerification() {
    this._afs.authState.subscribe(user => {
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

  getCurrentUser(): string {
    return firebase.auth().currentUser.uid;
  }
}

/**
  email: res.user.email,
            uid: res.user.uid,
            registrationDate: new Date().toString(),
            name: name
 */
