import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database.service";
import { IPost } from "../../interfaces/post-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { IFollow } from "../../interfaces/follow.interface";
import { FollowService } from "../../services/follow/follow.service";
import  * as _  from "lodash";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  followerPosts: IPost[] = [];
  userPosts: IPost[] = [];
  user: IUser;
  following: IFollow[] =[];
  showSpinner: boolean = false;

  constructor(private databaseService: DatabaseService, private auth: FirebaseAuthService, private followingService: FollowService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.getFollowing()

    this.databaseService.getCurrentUser(this.auth.getCurrentUserID()).subscribe(data => {
      this.user = data
    });
    
  }

  getFollowing() {
    this.followingService.getFollowedUsers().subscribe(data => {
      this.following = data
      this.showSpinner = false
      this.getPosts(this.following)
    })
  }

  getPosts(following: IFollow[]) {
    for (let follower of following) {
      this.followingService.getFollowedUsersPosts(follower.followedId).subscribe(data => {
        this.posts = data
        this.followerPosts.push(...this.posts)

        this.databaseService.getLoggedInUserPosts().subscribe(data => {
          this.userPosts = data
          // remove all duplicates from array
          this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
        })
      })
    }
  }
}