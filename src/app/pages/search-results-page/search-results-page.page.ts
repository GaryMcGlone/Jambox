import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.page.html',
  styleUrls: ['./search-results-page.page.scss'],
})
export class SearchResultsPagePage implements OnInit {

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    // this.databaseService.searchResults.subscribe(results => {
    //   console.log(results)
    // })
  }

}
