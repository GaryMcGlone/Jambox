import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  startAt: string;
  endAt: string;
  showSpinner: boolean = false;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit() {
  }

  search($event) {
    this.userService.getUsersByQuery($event.target.value).subscribe(users => {
      this.users = users
      console.log(users)
    })
  }

}
