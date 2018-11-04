import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuth/firebase-auth.service'
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.auth.doLogin(email, password)
  }

  navigateToSignUp() {
    this.router.navigate(['signUp'])
  }
}


