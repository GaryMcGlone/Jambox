import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { ToastController } from "@ionic/angular";
//import { AnalyticsService } from "../../services/analytics/analytics.service";
@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  spotifyUser: any;
  user: IUser;
  
  constructor( public spotifyService: SpotifyService, private dbService: DatabaseService, private router: Router, private authService: FirebaseAuthService, private toastController: ToastController // private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    if (this.spotifyService.loggedIn) {
      this.spotifyService.getLoggedInUser().subscribe(user => {
        if (user) {
          this.spotifyUser = user;
        }
      });
    }
    if (!this.spotifyUser) {
      this.dbService
        .getCurrentUser()
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  logout() {
    // this.analytics.logButtonClick("logout", { param: "Logout" });
    this.authService.doLogout();
  }

  exit() {
    this.router.navigate(["tabs/profile"]);
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
  report(bug){
    this.presentToast("Thank you for your feedback!")
    this.dbService.addBug(bug)
  }
}
