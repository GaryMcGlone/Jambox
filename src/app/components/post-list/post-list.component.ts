import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database.service";
import { IPost } from "../../interfaces/post-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { TouchSequence } from "selenium-webdriver";

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
  following: string[];
  showSpinner: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    //get all the posts initially
    this.showSpinner = true;
    this.databaseService.getPosts().subscribe(posts => {
      (this.posts = posts), error => (this.errorMessage = <any>error);
      this.showSpinner = false;
    });

    this.databaseService
      .getCurrentUser(this.auth.getCurrentUserID())
      .subscribe(data => {
        (this.user = data),
          (this.following = this.user.following);
      });
    this.cssClass = "animated slideInUp faster card";
  }
}
