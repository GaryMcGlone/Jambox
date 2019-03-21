import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class YouTubeApiService {
  //https://www.googleapis.com/youtube/v3/search?part=snippet&part=id
  //&q=Nice
  //&regionCode=US
  //&type=video
  //&videoCategoryId=10

  // private _searchSiteURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
  private _searchSiteURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&part=id&q=';
  private _nextPageURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=';
  private _mostPopSiteURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular';
  private _param = '&key=';
  private _max = '&maxResults=';
  private _sort = '&order=';
  private _query = '&q=';
  private _typeVid = '&type=video';
  private _vidCategoryId = '&videoCategoryId=10';


  constructor(private _http: HttpClient) { }

  getSearchedVideos(query, filter, limit): Observable<YouTubeResponseSearch> {
    return this._http.get<YouTubeResponseSearch>(this._searchSiteURL + query + this._typeVid + this._vidCategoryId +
       this._sort + filter + this._max + limit  + this._param + environment.youTubeAPIKey)
      .pipe(tap(data => data),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log('YouTubeApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}