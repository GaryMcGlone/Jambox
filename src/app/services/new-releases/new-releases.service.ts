import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Results, NewReleases } from "../../interfaces/new-release.interface";

@Injectable({
  providedIn: "root"
})
export class NewReleasesService {
  private newReleasesURL =
    "https://rss.itunes.apple.com/api/v1/us/apple-music/new-releases/all/15/explicit.json";
  
   private cors = "https://cors-anywhere.herokuapp.com/";

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<NewReleases> {
    return this.http
      .get<NewReleases>(this.cors+this.newReleasesURL)
      .pipe(tap(res => console.log(res.feed.results)));
  }
}
