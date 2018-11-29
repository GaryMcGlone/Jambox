import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-song-by-id',
  templateUrl: './search-song-by-id.page.html',
  styleUrls: ['./search-song-by-id.page.scss'],
})
export class SearchSongByIdPage implements OnInit {

  searchResults: IPost[] = [];

  constructor(private databaseService: DatabaseService, private route: ActivatedRoute) {
  }
  //spotify:album:6ZksrxRWlJ7ExylPyJwfLJ
  songId: string;

  ngOnInit() {
    this.songId = this.route.snapshot.paramMap.get('songId');
    this.getPostsByID(this.songId)
  }
  getPostsByID(songId: string) {
    this.databaseService.searchForASong(songId).subscribe(data => {
     console.log(data), this.searchResults = data
    })
  }

}
