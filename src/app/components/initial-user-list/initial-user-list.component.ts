import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user-interface';

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

  constructor(private userService: UsersService) { }

  ngOnInit() {
     this.userService.getAllUsers().subscribe(data => this.users = data)
   }

  search($event) {
    let q: string = $event.target.value;
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
