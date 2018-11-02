import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/";
@Injectable({
  providedIn: "root"
})
export class FirebaseAuthService {
  private user: Observable<firebase.User>;
  loggedInStatus: boolean = false;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    this._firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendEmailVerification();
        return firebase
          .database()
          .ref("users/" + res.user.uid)
          .set({
            email: res.user.email,
            uid: res.user.uid,
            registrationDate: new Date().toString(),
            name: name
          })
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(["loginMenu"]);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification().then(() => {
        console.log("email sent");
      });
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
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
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this._firebaseAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
      this.loggedInStatus = false;
    });
  }

  checkIfLoggedIn(): boolean {
    if (firebase.auth().currentUser != null) {
      return true;
    } else {
      return false;
      this.router.navigate(["loginMenu"]);
    }
  }
}
