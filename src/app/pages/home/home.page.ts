import { Component,  OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../services/firebaseAuth/firebase-auth.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private auth: FirebaseAuthService) {}

  ngOnInit(){
   this.auth.checkIfLoggedIn();
  }

}
