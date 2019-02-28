import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-profile-liked-post-list',
  templateUrl: './profile-liked-post-list.component.html',
  styleUrls: ['./profile-liked-post-list.component.scss']
})
export class ProfileLikedPostListComponent implements OnInit {

  userLikedPosts: IPost[] = [];
  constructor(
    private db: DatabaseService,
    
  ) { }

  ngOnInit() {
    // this.db.getLikedPosts()
  }

}
