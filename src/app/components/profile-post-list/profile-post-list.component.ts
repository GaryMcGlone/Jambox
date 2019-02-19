import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-profile-post-list',
  templateUrl: './profile-post-list.component.html',
  styleUrls: ['./profile-post-list.component.scss']
})
export class ProfilePostListComponent implements OnInit {

  public userPosts: IPost[];
  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getPostByUserID().subscribe(data => {
      this.userPosts = data
    })
  }

}
