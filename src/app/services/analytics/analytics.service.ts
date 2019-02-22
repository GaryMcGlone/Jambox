import { Injectable } from "@angular/core";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor(private firebaseAnalytics: FirebaseAnalytics) {
    this.firebaseAnalytics.setEnabled(true);
  }

  log(name: string, value: any) {
    console.log("logging response from service ", name, value);
    this.firebaseAnalytics
      .logEvent(name, { param: value })
      .catch(error => console.log(error));
  }
  currentScreen(screenName) {
    this.firebaseAnalytics
      .setCurrentScreen(screenName)
      .catch(error => console.log(error));
  }

  setUserProperty(name, value) {
    this.firebaseAnalytics
      .setUserProperty(name, value)
      .catch(res => console.log(res));
  }
}
