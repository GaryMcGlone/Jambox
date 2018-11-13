import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify/spotify.service";

@Component({
  selector: "app-spotify-search",
  templateUrl: "./spotify-search.component.html",
  styleUrls: ["./spotify-search.component.scss"]
})
export class SpotifySearchComponent implements OnInit {
  items: IItems[];
  constructor(public spotifyService: SpotifyService) {}

  ngOnInit() {}

  searchSpotify(search) {
    this.spotifyService.searchSpotify(search).subscribe(data => {
      this.items = data.tracks.items;
    });
  }
}
