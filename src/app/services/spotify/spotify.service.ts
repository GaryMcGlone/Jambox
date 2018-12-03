import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Platform } from "@ionic/angular";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Router } from "@angular/router";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { DatabaseService } from "../database/database.service";
import { IUser } from "../../interfaces/user-interface";
import { TouchSequence } from "selenium-webdriver";

declare var cordova: any;

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private searchEndpoint = "https://api.spotify.com/v1/search?q=";

  private currentPlayingTrackEndpoint =
    "	https://api.spotify.com/v1/me/player/currently-playing";

  private profileUrl = "https://api.spotify.com/v1/me";

  private options = "&type=track&market=US&limit=8&offset=0";
  private errorMessage: string;

  private accessToken: string = "";
  private loggedIn = false;

  private playing: boolean = false;
  private paused: boolean = false;
  private songPos: number;

  constructor(private _http: HttpClient, private platform: Platform, private storage: NativeStorage, private router: Router) {
    this.platform.ready().then(() => {
      this.storage.getItem("logged_in")
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
      scopes: [ "streaming", "playlist-read-private", "user-read-email", "user-read-private", "user-read-currently-playing", "user-read-birthdate" ],
      tokenExchangeUrl: "https://jambox-app.herokuapp.com/exchange",
      tokenRefreshUrl: "https://jambox-app.herokuapp.com/refresh"
    };
    cordova.plugins.spotifyAuth
      .authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.accessToken = accessToken;
        this.loggedIn = true;
        this.storage.setItem("logged_in", true);
        this.router.navigate(["home"]);
      });
  }

  logout() {
    cordova.plugins.spotifyAuth.forget();
    this.loggedIn = false;
    this.storage.setItem("logged_in", false);
    this.router.navigate(["login"]);
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

  getCurrentlyPlayingTrack(): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.accessToken);

    return this._http
      .get<ISpotifyResponse>(this.currentPlayingTrackEndpoint, {
        headers: headers
      })
      .pipe(
        tap(res => console.log(res), error => (this.errorMessage = <any>error))
      );
  }

  getLoggedInUser() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.accessToken);

    return this._http
      .get<ISpotifyResponse>(this.profileUrl, {
        headers: headers
      })
      .pipe(
        tap(res => console.log(res), error => (this.errorMessage = <any>error))
      );
  }

  getSongPosition(): number {
    cordova.plugins.spotify.getPosition().then(pos => {
      this.songPos = pos;
      console.log('paused at : ', this.songPos)
    });
    return this.songPos;
  }

  pauseTrack() {
    cordova.plugins.spotify.pause().then(() => {
      this.paused = true
      this.playing = false;
    });
  }

  play(songId: string) {
    console.log('playing song with id = ', songId)
    cordova.plugins.spotify
      .play(songId, {
        clientId: "6e9fbfb6b8994a4ab553758dc5e38b13",
        token: this.accessToken
      })
      .then(() => {
        console.log("playing new song", songId);
        this.playing = true;
        this.paused = false
      });
  }

  resumeSong(songId) {
    this.getSongPosition()
    console.log('resuming song with id = ', songId)
    cordova.plugins.spotify
      .resume(
        songId,
        {
          clientId: "6e9fbfb6b8994a4ab553758dc5e38b13",
          token: this.accessToken
        },
        this.songPos
      )
      .then(() => {
        console.log("resume songId", songId);
        this.playing = true;
        this.paused = false;
      });
  }

  open(item) {
    window.open(item, "_system", "location=yes");
  }
}
