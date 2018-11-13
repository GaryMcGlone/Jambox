import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { Platform } from "@ionic/angular"
import { NativeStorage } from "@ionic-native/native-storage/ngx"
import { Router } from "@angular/router"
import SpotifyWebApi from 'spotify-web-api-js'
import { Media,MediaObject } from "@ionic-native/media"

declare var cordova: any

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  spotify:any
  currentTrack: MediaObject = null
  playing = false
  private searchEndpoint = "https://api.spotify.com/v1/search?q="

  private currentPlayingTrackEndpoint =
    "	https://api.spotify.com/v1/me/player/currently-playing"

  private profileUrl = "https://api.spotify.com/v1/me"

  private options = "&type=track&market=US&limit=8&offset=0"
  private errorMessage: string

  private accessToken: string = ""
  loggedIn = false

  constructor(
    private _http: HttpClient,
    private platform: Platform,
    private storage: NativeStorage,
    private router: Router,
    private media: Media
  ) {
    this.spotify = new SpotifyWebApi()
    this.platform.ready().then(() => {
      this.storage
        .getItem("logged_in")
        .then(res => {
          if (res) {
            this.authWithSpotify()
          }
        })
        .catch(err => console.log(err))
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
        "user-read-private",
        "user-read-currently-playing"
      ],
      tokenExchangeUrl: "https://jambox-app.herokuapp.com/exchange",
      tokenRefreshUrl: "https://jambox-app.herokuapp.com/refresh"
    }

    cordova.plugins.spotifyAuth
      .authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        this.accessToken = accessToken
        this.loggedIn = true
        this.storage.setItem("logged_in", true)
        this.router.navigate(["home"])
      })
  }

  logout() {
    cordova.plugins.spotifyAuth.forget()
    this.loggedIn = false
    this.storage.setItem("logged_in", false)
    this.router.navigate(["login"])
  }

  searchSpotify(search): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("Authorization", "Bearer " + this.accessToken)

    return this._http
      .get<ISpotifyResponse>(this.searchEndpoint + search + this.options, {
        headers: headers
      })
      .pipe(tap(res => res.tracks, error => (this.errorMessage = <any>error)))
  }

  getCurrentlyPlayingTrack(): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("Authorization", "Bearer " + this.accessToken)

    return this._http
      .get<ISpotifyResponse>(this.currentPlayingTrackEndpoint, {
        headers: headers
      })
      .pipe(
        tap(res => console.log(res), error => (this.errorMessage = <any>error))
      )
  }

  getLoggedInUser() {
    let headers: HttpHeaders = new HttpHeaders()
    headers = headers.append("Authorization", "Bearer " + this.accessToken)

    return this._http
      .get<ISpotifyResponse>(this.profileUrl, {
        headers: headers
      })
      .pipe(
        tap(res => console.log(res), error => (this.errorMessage = <any>error))
      )
  }

  playTrack(songId){
    this.playing = true
    this.currentTrack = this.media.create(songId)

    // this.currentTrack.onSuccess.subscribe(() => {
    //   this.playing = false
    // })
    
    // this.currentTrack.onError.subscribe(() => {
    //   this.playing = false
    // })
    this.currentTrack.play()
  }
  stopTrack() {
    if(this.currentTrack) {
      this.currentTrack.stop()
      this.playing = false
    }
  }
  openInSpotify(item) {
    window.open(item.track.external_urls, '_system', 'location=yes' )
  }
}
