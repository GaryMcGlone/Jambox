import { Component, OnInit } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";
import { IUser } from "../../interfaces/user-interface";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  user: IUser;
  spotify: any;
  constructor(
    private menuCtrl: MenuController,
    private analytics: AnalyticsService,
    private router: Router
  ) {
      // this.analytics.currentScreen("Home");
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
   
  }

}
