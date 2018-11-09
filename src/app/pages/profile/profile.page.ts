import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private auth: FirebaseAuthService, private menuCtrl: MenuController, private db: DatabaseService, private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  signOut() {
    this.auth.doLogout();
  }
  getFollowers() {
    var userid = this.auth.getCurrentUser()
    console.log("userID: ", userid)
    this.db.getUserFollowing(userid);
  }
  navigateToSettings() {
    this.router.navigate(['settings'])
  }
}
