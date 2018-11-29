import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { NavParams } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent implements OnInit {
  searchResults: IPost[] = [];

  constructor(private databaseService: DatabaseService) { 
   }

  ngOnInit() {
  }

  performSearch(songId) {
    console.log("searching for:", songId)
    this.databaseService.searchForASong(songId).subscribe(results => {
      this.searchResults = results
      console.log(results)
    })
  }

}
