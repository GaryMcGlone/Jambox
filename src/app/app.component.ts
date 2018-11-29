import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SpotifyService } from "./services/spotify/spotify.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  spotifySelect: boolean = true;
  youtubeSelect: boolean = false;
  userSelect: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public spotifyService: SpotifyService
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
    switch (event.target.value) {
      case "spotify":
        this.spotifySelect = true;
        this.youtubeSelect = false;
        this.userSelect = false
        break;
      case "youtube":
        this.youtubeSelect = true;
        this.spotifySelect = false;
        this.userSelect = false
        break;
      case "user":
        this.spotifySelect = false;
        this.youtubeSelect = false
        this.userSelect = true
        break;
    }
  }

  spotifySelectedCheck(): boolean {
    if (this.spotifySelect == true) return true;
    else return false;
  }
  youtubeSelectedCheck(): boolean {
    if (this.youtubeSelect == true) return true;
    else return false;
  }
  userSelectedCheck() : boolean {
    if (this.userSelect == true) return true;
    else return false;
  }
}
