import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuth/firebase-auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private auth: FirebaseAuthService) { }

  ngOnInit() {
  }

  signOut(){
    console.log("loggin tf out")
    this.auth.doLogout();
  }
}
