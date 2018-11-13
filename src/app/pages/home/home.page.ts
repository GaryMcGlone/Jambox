import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import * as SpotifyWebApi from "spotify-web-api-js";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  user: IUser
  spotify:any;
  constructor(private menuCtrl: MenuController, private db: DatabaseService, private auth: FirebaseAuthService ) {
    
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
 //   this.db.getUsername(this.auth.getCurrentUser())

  }
}
