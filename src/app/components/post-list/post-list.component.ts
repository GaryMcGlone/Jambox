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
  errorMessage: string;
  cssClass: string;
  user: IUser;
  following: IFollow[];
  showSpinner: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private auth: FirebaseAuthService,
    private followingService: FollowService
  ) {}

  ngOnInit() {
    this.followingService.getFollowedUsers().subscribe(data => {
      if(data) {
        this.following = data;
      }
    });
    this.showSpinner = true;

    this.databaseService.getPosts().subscribe(posts => {
      this.posts = posts
      console.log(posts)
      this.showSpinner = false;
    });

    this.databaseService
      .getCurrentUser(this.auth.getCurrentUserID())
      .subscribe(data => {
        (this.user = data)
      });
    this.cssClass = "animated slideInUp faster card";
  }
}
 