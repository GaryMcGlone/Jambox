import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SpotifyService } from "./services/spotify/spotify.service";
import { SplitPaneCheckerService } from "./services/split-pane-checker/split-pane-checker.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  spotifySelect: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public spotifyService: SpotifyService,
    public splitPaneChecker: SplitPaneCheckerService
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
        break;
      case "youtube":
        this.spotifySelect = false;
        break;
    }
  }

  spotifySelectedCheck(): boolean {
    if (this.spotifySelect == true) return true;
    else return false;
  }

  signInWithSpotify() {
    this.spotifyService.authWithSpotify();
  }
  spotifyLogout() {
    this.spotifyService.logout();
  }
}
