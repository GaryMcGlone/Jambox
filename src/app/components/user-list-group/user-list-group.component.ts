import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user-interface';

@Component({
  selector: 'app-user-list-group',
  templateUrl: './user-list-group.component.html',
  styleUrls: ['./user-list-group.component.scss']
})
export class UserListGroupComponent implements OnInit {
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
     })
   } else {
     this.users = []
     this.userService.getAllUsers().subscribe(data => {
       this.users = data
     })
   }
 }
}
