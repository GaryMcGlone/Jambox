import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database.service";
import { IPost } from "../../interfaces/post-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { IFollow } from "../../interfaces/follow.interface";
import { FollowService } from "../../services/follow/follow.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  followerPosts: IPost[] = [];
  user: IUser;
  following: IFollow[];
  showSpinner: boolean = false;

  constructor(private databaseService: DatabaseService, private auth: FirebaseAuthService, private followingService: FollowService) { }

  ngOnInit() {
    this.showSpinner = true;


    this.getFollowing()

    //this.databaseService.getPosts().subscribe(data => this.posts = data)

    this.databaseService.getCurrentUser(this.auth.getCurrentUserID()).subscribe(data => {
      this.user = data
    });
  }

  getFollowing() {
    this.followingService.getFollowedUsers().subscribe(data => {

      this.following = data
      console.log("following", this.following)
      this.showSpinner = false
      this.getPosts(this.following)
    })
  }

  getPosts(following: IFollow[]) {

    for (let follower of following) {
      console.log("fid", follower.followedId)

      this.databaseService.getPostByUserID(follower.followedId).subscribe(data => {
        console.log("data", data)
        this.posts = data
        for (let post of this.posts) {
          this.followerPosts.push(post)
          console.log(this.followerPosts)
        }
      })


    }



  }
}