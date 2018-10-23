import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class YouTubeApiService {

  private _searchSiteURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
  private _nextPageURL = 'https://www.googleapis.com/youtube/v3/search?pageToken=';
  private _mostPopSiteURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular';
  private _param = '&key=';
  private _max = '&maxResults=';
  private _sort = '&order=';
  private _query = '&q=';
  private _type = '&'
  private _key = 'AIzaSyBwTqh7G-xV4WWZg_-QFB04K4vCPjLXzAY';

  constructor(private _http: HttpClient) { }

  getSearchedVideos(query, filter, limit): Observable<YouTubeResponseSearch> {
    return this._http.get<YouTubeResponseSearch>(this._searchSiteURL + query + this._sort + filter 
      + this._max + limit  + this._param + this._key)
      .pipe(tap(data => console.log('Search Data:', data)),
      catchError(this.handleError));
  }


  getFeaturedVideos(): Observable<YouTubeResponse> {
    return this._http.get<YouTubeResponse>(this._mostPopSiteURL 
      + this._param + this._key)
      .pipe(tap(data => console.log('Featured Videos', data)),
      catchError(this.handleError));
  }

  getNextPage(token, filter, query): Observable<YouTubeResponseSearch> {
    return this._http.get<YouTubeResponseSearch>(this._nextPageURL + token + this._max + '5' + this._sort + filter
      + this._query + query + this._param + this._key)
      .pipe(tap(data => console.log('Next Page', data)),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log('YouTubeApiService: ' + err.message);
    return Observable.throw(err.message);
  }
}