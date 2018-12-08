import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"]
})
export class SignUpPage implements OnInit {
  constructor(
    private auth: FirebaseAuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private analytics: AnalyticsService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {}

  signUp(email: string, password: string, displayName: string) {
    this.analytics.logButtonClick("signUp", { param: "User_Sign_Up" });
    this.auth.signUp(email, password, displayName);
  }

  navigateToLogin() {
    this.router.navigate(["login"]);
  }
}
