import { Injectable } from '@angular/core';
import { FirebaseAnalytics  } from "@ionic-native/firebase-analytics/ngx";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private firebaseAnalytics: FirebaseAnalytics) { 
    this.firebaseAnalytics.setEnabled(true)
  }

  logButtonClick(name:string,value:any) {
    console.log('logging response from service ', name, value)
    this.firebaseAnalytics.logEvent(name,{param:value})
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }
  currentScreen(screenName) {
   this.firebaseAnalytics.setCurrentScreen(screenName)
   .then(res => console.log(res))
   .catch(error => console.log(error))
  }
}
