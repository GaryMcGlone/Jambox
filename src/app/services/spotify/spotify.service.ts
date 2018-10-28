import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

declare var cordova: any;

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private endpoint = "https://api.spotify.com/v1/search?q=";
  private options = "&type=track&market=US&limit=15&offset=0";
  private errorMessage: string;

  result = {};

  constructor(private _http: HttpClient, private router: Router) {}

  private accessToken: string = '';

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
        this.accessToken = accessToken
        console.log("this.accessToken: ", this.accessToken);
        this.result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken
        };
        console.log(`Access Token expires in ${expiresAt - Date.now()}ms.`);
      });
    console.log("result: ", this.result);
  }
  // private headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.accessToken}`
  // });

  

  logout() {
    cordova.plugins.spotifyAuth.forget();
  }
  searchSpotify(search): Observable<ISpotifyResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer "+this.accessToken)
    console.log(headers.getAll('authorization'));
    return this._http
      .get<ISpotifyResponse>(this.endpoint + search + this.options, {
        headers: headers
      })
      .pipe(tap(res => res.tracks, error => (this.errorMessage = <any>error)));
  }
}
