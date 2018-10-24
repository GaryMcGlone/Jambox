import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, EMPTY, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs/operators";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private endpoint = "https://api.spotify.com/v1/search?q=";
  private options = "&type=track&market=US&limit=10&offset=0";
  private auth_token;
  private errorMessage: string;

  constructor(private _http: HttpClient, private router: Router) {}

  getToken() {
    this.auth_token = window.location.search.replace("?access_token=", "");
    
    console.log(window.location.hash)
    console.log(this.auth_token)
    this.router.navigate(["home"]);
    return this.auth_token;
  }

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`
  });

  searchSpotify(search): Observable<ISpotifyResponse> {
    return this._http
      .get<ISpotifyResponse>(this.endpoint + search + this.options, {
        headers: this.headers
      })
      .pipe(tap(res => res.tracks,
      error => (this.errorMessage = <any>error))
      )
  }
}
