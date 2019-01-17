import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-current-playing',
  templateUrl: './current-playing.component.html',
  styleUrls: ['./current-playing.component.scss']
})
export class CurrentPlayingComponent implements OnInit {

  currentTrack: IItems;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getCurrentlyPlayingTrack().subscribe(res => {
      this.currentTrack = res.item
    })
  }

}
