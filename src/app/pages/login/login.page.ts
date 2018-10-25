import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuth/firebase-auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: FirebaseAuthService) { }

  ngOnInit() {
  }

  firebaseLogin(email: string, password: string) {
    console.log("email: " , email);
    console.log("password: " , password);

    this.auth.doLogout();
    this.auth.doLogin(email, password)
  }

}


