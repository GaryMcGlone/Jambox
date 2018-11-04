import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp(email: string, password: string, displayName: string) {
   this.auth.signUp(email, password, displayName);
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }
}

