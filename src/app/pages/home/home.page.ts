import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(private menuCtrl: MenuController, private db: DatabaseService, private auth: FirebaseAuthService ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    this.db.getUsername(this.auth.getCurrentUserUID())
  }
}
