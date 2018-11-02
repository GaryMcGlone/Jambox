import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { NativeStorageOriginal } from "@ionic-native/native-storage";

declare var cordova: any;

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private endpoint = "https://api.spotify.com/v1/search?q=";
  private options = "&type=track&market=US&limit=15&offset=0";
  private errorMessage: string;
  private accessToken: string = "";
  loggedIn = false;

  result = {};

  constructor( private _http: HttpClient, private router: Router, private platform: Platform, private storage: NativeStorageOriginal) {
    this.platform.ready().then(() => {
      this.storage.getItem('logged_in').then(res => {
        if(res){
          this.authWithSpotify()
        }
      })
    })
  }

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

    cordova.plugins.spotifyAuth
      .authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.accessToken = accessToken;
        this.loggedIn = true
        this.storage.setItem('logged_in', true)
        this.result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken
        };
      });
  }

  logout() {
    cordova.plugins.spotifyAuth.forget();
    this.loggedIn = false;
    this.storage.setItem('logged_in', false)
  }

  searchSpotify(search): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.accessToken);

    return this._http
      .get<ISpotifyResponse>(this.endpoint + search + this.options, {
        headers: headers
      })
      .pipe(tap(res => res.tracks, error => (this.errorMessage = <any>error)));
  }
}
