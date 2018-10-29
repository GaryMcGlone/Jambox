import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SpotifyService } from './services/spotify/spotify.service';

declare var cordova:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  spotifySelect: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
<<<<<<< HEAD
=======
    public spotifyService: SpotifyService
>>>>>>> 60bdf6aa876ba49e76874d1a9c82bd9680b437dc
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
  
<<<<<<< HEAD
  result = {}
  authWithSpotify() {
    const config = {
      clientId: "6e9fbfb6b8994a4ab553758dc5e38b13",
      redirectUrl: "jamboxapp://callback",
      scopes: [
        "streaming",
        "playlist-read-private",
        "user-read-email",
        "user-read-private"
      ],
      tokenExchangeUrl: "https://jambox-app.herokuapp.com/exchange",
      tokenRefreshUrl: "https://jambox-app.herokuapp.com/refresh"
    };

    cordova.plugins.spotifyAuth.authorize(config)
    .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
      this.result = { access_token: accessToken, expires_in: expiresAt, ref: encryptedRefreshToken };
    });
    console.log(this.result)
=======
  signInWithSpotify() {
    this.spotifyService.authWithSpotify()
  }
  spotifyLogout() {
    this.spotifyService.logout()
>>>>>>> 60bdf6aa876ba49e76874d1a9c82bd9680b437dc
  }
}
