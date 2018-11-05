import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent implements OnInit {
  searchResults: IPost[] = [];

  constructor() { 
   }

  ngOnInit() {
  }

  // performSearch(songId) {
  //   console.log("searching for:", songId)
  //   this.databaseService.searchForASong(songId).subscribe(results => {
  //     this.searchResults = results
  //     console.log(results)
  //   })
  // }

}
