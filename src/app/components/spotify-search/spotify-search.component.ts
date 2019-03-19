import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-spotify-search",
  templateUrl: "./spotify-search.component.html",
  styleUrls: ["./spotify-search.component.scss"]
})
export class SpotifySearchComponent implements OnInit {
  items: IItems[];
  showSpinner: boolean = false;
  searchTerm:string
  constructor(public spotifyService: SpotifyService, 
  //private analytics: AnalyticsService
    ) {}

  ngOnInit() {}

  searchSpotify() {
  //  this.analytics.log("spotifySearch", { param: "User_Searched_Spotify" });
    if(!this.searchTerm) {
      this.showSpinner = false;
    } else {
      this.showSpinner = true;
    }
    this.spotifyService.searchSpotify(this.searchTerm).subscribe(data => {
      this.items = data.tracks.items;
      this.showSpinner = false;
    });
    
   }
}
