import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

declare var cordova: any;

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private searchEndpoint = "https://api.spotify.com/v1/search?q=";
  private currentPlayingTrackEndpoint =
    "	https://api.spotify.com/v1/me/player/currently-playing";
 
  private options = "&type=track&market=US&limit=15&offset=0";
  private errorMessage: string;
 
  private accessToken: string = "";
  loggedIn = false;

  result = {};

  constructor(private _http: HttpClient, private platform: Platform, private storage: NativeStorage) {
    this.platform.ready().then(() => {
      this.storage
        .getItem("logged_in")
        .then(res => {
          if (res) {
            this.authWithSpotify();
          }
        })
        .catch(err => console.log(err));
    });
  }

  authWithSpotify() {
    const config = {
      clientId: "6e9fbfb6b8994a4ab553758dc5e38b13",
      redirectUrl: "jamboxapp://callback",
      scopes: [
        "streaming",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing"
      ],
      tokenExchangeUrl: "https://jambox-app.herokuapp.com/exchange",
      tokenRefreshUrl: "https://jambox-app.herokuapp.com/refresh"
    };

    cordova.plugins.spotifyAuth
      .authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.accessToken = accessToken;
        this.loggedIn = true;
        this.storage.setItem("logged_in", true);
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
    this.storage.setItem("logged_in", false);
  }

  searchSpotify(search): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.accessToken);

    return this._http
      .get<ISpotifyResponse>(this.searchEndpoint + search + this.options, {
        headers: headers
      })
      .pipe(tap(res => res.tracks, error => (this.errorMessage = <any>error)));
  }

  getCurrentlyPlayingTrack() : Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.accessToken);
    console.log(headers.get('authorization'))
    return this._http
    .get<ISpotifyResponse>(this.currentPlayingTrackEndpoint , {
      headers: headers
    })
    .pipe(tap(res => console.log(res), error => (this.errorMessage = <any>error)));
  }
}
