import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  spotifySelect: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  segmentChanged(event: any) {

    console.log(event.target.value)

    switch(event.target.value)
    {
      case 'spotify': this.spotifySelect = true;
                      break;
      case 'youtube': this.spotifySelect = false;
                      break;
    }
  }

  spotifySelectedCheck(): boolean {
    if(this.spotifySelect == true)
      return  true;
    else
      return false;
  }
  

}
