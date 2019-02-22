import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user-interface';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-initial-user-list',
  templateUrl: './initial-user-list.component.html',
  styleUrls: ['./initial-user-list.component.scss']
})
export class InitialUserListComponent implements OnInit {
  users: IUser[] = [];
  startAt: string;
  endAt: string;
  showSpinner: boolean = false;

  constructor(private userService: UsersService, private analytics: AnalyticsService) { }

  ngOnInit() {
     this.userService.getAllUsers().subscribe(data => this.users = data)
   }

  search($event) {
    this.analytics.log("searchedUserInPopupSearch", { param: "User_Searched_PopupSearch" } )
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
