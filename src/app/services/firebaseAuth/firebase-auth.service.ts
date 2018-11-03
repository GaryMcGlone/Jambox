import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
import { DatabaseService } from '../database/database.service'
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService,
    private toastCtrl: ToastController) {
    this.user = _firebaseAuth.authState;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  signup(email: string, password: string, name: string) {
    this._firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        let registrationDate = new Date()
        this.dbService.storeUser(email, res.user.uid, name)
        this.sendEmailVerification();
        this.presentToast("email verification sent")
      })
      .catch(err => {
        this.presentToast(err.message)
      });
  }

  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification().then(() => {

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
            this.router.navigate([""]);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut();
      this.router.navigate(["loginmenu"]);

    });
  }

  checkIfLoggedIn(): boolean {
    if (firebase.auth().currentUser != null) {
      return true;
    } else {
      this.router.navigate(["loginmenu"]);
      return false;

    }
  }


}


/**
  email: res.user.email,
            uid: res.user.uid,
            registrationDate: new Date().toString(),
            name: name
 */