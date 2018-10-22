import { Component, OnInit } from '@angular/core';
import { YouTubeApiService } from '../../services/youtube/youtube-api.service';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.scss']
})
export class YoutubeSearchComponent implements OnInit {
  items: IItems[];
  limit 

  constructor(private youtubeService: YouTubeApiService) { }

  ngOnInit() {
  }

  // searchYouTube(search) {
  //   this.youtubeService.getSearchedVideos(search).subscribe(data => {
  //     this.items = data.tracks.items;
  //   });
  // }

}
