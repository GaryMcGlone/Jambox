import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';
import { ILike } from '../../interfaces/like-interface';
import * as _ from "lodash";
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-profile-liked-post-list',
  templateUrl: './profile-liked-post-list.component.html',
  styleUrls: ['./profile-liked-post-list.component.scss']
})
export class ProfileLikedPostListComponent implements OnInit {

  userLikedPosts: IPost[] = [];
  showSpinner: boolean = false;
  testPosts: IPost[] = [];
  likes: ILike[] = [];
  likesStringArray: string [] = [];
  constructor(
    private db: DatabaseService,
    private auth: FirebaseAuthService
  ) { }

  ngOnInit() {
    this.showSpinner = true;

    this.db.getUsersLikedPostIDs(this.auth.getCurrentUserID()).subscribe(data => {
      this.likes = data;
        let counter = 1;
        if(counter = 1)
        {
          this.userLikedPosts = [];
        }

        this.likes.forEach(like => {
          this.db.getPostsByPostID(like.postId).subscribe(data => {
            this.testPosts = data
            this.userLikedPosts.unshift(...this.testPosts)
            this.userLikedPosts = _.uniqBy([...this.userLikedPosts], 'id');
            this.userLikedPosts.sort(function(obj1, obj2) {
              return obj2.createdAt.seconds - obj1.createdAt.seconds
            })
          })
        });

        this.showSpinner = false
    })
  }

}
