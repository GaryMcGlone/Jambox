import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user-interface';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  startAt: string;
  endAt: string;
  showSpinner: boolean = false;

  constructor(private userService: UsersService, private analytics: AnalyticsService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => this.users = data)
  }

  search($event) {
    this.analytics.log("searchedUserInChatView", { param: "Search_InChatView" } )
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
