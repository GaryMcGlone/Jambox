import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Results } from "../../interfaces/new-release.interface";

@Injectable({
  providedIn: "root"
})
export class NewReleasesService {
  private newReleasesURL =
    "https://rss.itunes.apple.com/api/v1/us/apple-music/coming-soon/all/10/explicit.json";
  
   private cors = "https://cors-anywhere.herokuapp.com/";

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Results[]> {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers.append("X-Requested-With","XMLHttpRequest");
    // headers.append("Access-Control-Allow-Credentials", "true" );
    // headers.append('Access-Control-Allow-Credentials', 'localhost:8100')
    return this.http
      .get<Results[]>(this.cors+this.newReleasesURL)
      .pipe(tap(res => console.log(res)));
  }
}
