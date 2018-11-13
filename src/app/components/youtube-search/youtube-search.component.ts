import { Component, OnInit } from '@angular/core';
import { YouTubeApiService } from '../../services/youtube/youtube-api.service';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.scss']
})
export class YoutubeSearchComponent implements OnInit {
  items: itemS[];
  filter: string = 'relevance';
  limit: string = '8';
  type: string = '10';

  constructor(private youtubeService: YouTubeApiService) { }

  ngOnInit() {
  }

  searchYouTube(search) {
    this.youtubeService.getSearchedVideos(search, this.filter, this.limit).subscribe(data => {
      this.items = data.items;
    });
  }

}
