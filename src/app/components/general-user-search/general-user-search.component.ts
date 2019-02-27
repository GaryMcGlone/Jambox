import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user-interface';
import { UsersService } from '../../services/users/users.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-general-user-search',
  templateUrl: './general-user-search.component.html',
  styleUrls: ['./general-user-search.component.scss']
})
export class GeneralUserSearchComponent implements OnInit {
  users: IUser[] = [];
  startAt: string;
  endAt: string;
  showSpinner: boolean = false;

  constructor(private userService: UsersService, 
    // private analytics: AnalyticsService 
    ) { }

  ngOnInit() {
     this.userService.getAllUsers().subscribe(data => this.users = data)
   }

  search($event) {
    // this.analytics.log("searchedUserInSearchPage", { param: "User_Searched_SearchPage" } )
    let q: string = $event.target.value;
    if (q) {
      this.userService.getUsersByQuery(q.toLowerCase()).subscribe(users => {
        this.users = users
      })
    } else {
      this.users = []
      this.userService.getAllUsers().subscribe(data => {
        this.users = data
      })
    }
  }
}
