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

  constructor(private userService: UsersService) { }

  ngOnInit() {
     this.userService.getAllUsers().subscribe(data => this.users = data)
   }

  search($event) {
    let q: string = $event.target.value;
    // if (q == '' || q == null || q == ' ') {
    //   console.log("q", q)
    //   this.userService.getAllUsers().subscribe(data => this.users = data)
    // }
    // else {
    //   this.userService.getUsersByQuery(q.toLowerCase()).subscribe(users => {
    //     this.users = users
    //     console.log("users", this.users)
    //   })
    // }

    if (q) {
      this.userService.getUsersByQuery(q.toLowerCase()).subscribe(users => {
        this.users = users
        console.log("searched users", this.users)
      })
    } else {
      this.users = []
      this.userService.getAllUsers().subscribe(data => {
        console.log("all users", data)
        this.users = data
      })
    }
  }
}
