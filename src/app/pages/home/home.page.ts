import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { IUser } from "../../interfaces/user-interface";
// import { AnalyticsService } from "../../services/analytics/analytics.service";

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
    // private analytics: AnalyticsService
  ) {
    // this.analytics.currentScreen("Home");
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit() {}
  // logEvent() {
  //   console.log("logging event");
  //   this.analytics.logButtonClick("testButton", { param: "_Test_Button_Click" });
  // }

  // doRefresh(refresher){


  //   setTimeout(() => {
  //     console.log("refresh end");
  //     refresher.complete();
  //   }, 2000);
  // }
}
