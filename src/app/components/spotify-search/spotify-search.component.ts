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
  constructor(public spotifyService: SpotifyService, private analytics: AnalyticsService) {}

  ngOnInit() {}

  searchSpotify(search) {
    this.analytics.logButtonClick("spotifySearch", { param: "User_Searched_Spotify" });
    if(!search){
      this.showSpinner = false;
    }
    else{
      this.showSpinner = true;
    }
    this.spotifyService.searchSpotify(search).subscribe(data => {
      this.items = data.tracks.items;
      console.log(this.items)
      this.showSpinner = false;
    });
    
   }
}
