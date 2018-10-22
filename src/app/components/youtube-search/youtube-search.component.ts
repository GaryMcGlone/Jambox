import { Component, OnInit } from '@angular/core';
import { YouTubeApiService } from '../../services/youtube/youtube-api.service';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.scss']
})
export class YoutubeSearchComponent implements OnInit {
  items: IItems[];
  filter: string = 'relevance';
  limit: string = '9';
  type: string = '10';

  constructor(private youtubeService: YouTubeApiService) { }

  ngOnInit() {
  }

  searchYouTube(search) {
    this.youtubeService.getSearchedVideos(search, this.filter, this.limit, this.type).subscribe(data => {
      // this.items = data.tracks.items;
      console.log(data);
    });
  }

}
