import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database.service";
import { IPost } from "../../interfaces/post-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { IFollow } from "../../interfaces/follow.interface";
import { FollowService } from "../../services/follow/follow.service";
import { ModalController } from "@ionic/angular";
import { UserSearchPage } from "../../pages/user-search/user-search.page";
import { Observable } from "rxjs";
import  * as _  from "lodash";
import { InitialUserSearchPage } from "../../pages/initial-user-search/initial-user-search.page";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  followerPosts: IPost[] = [];
  filteredPosts: IPost[] = [];
  user: IUser;
  following: IFollow[] = [];
  observableArrays : Observable<IPost[]>
  userPosts: IPost[] = [];
  showSpinner: boolean = false;

  constructor(private databaseService: DatabaseService, private auth: FirebaseAuthService, private followingService: FollowService, private modalController: ModalController) { }

  ngOnInit() {
    this.showSpinner = true;

    this.databaseService.getCurrentUser().subscribe(data => {
      this.user = data
    });

    this.followingService.getFollowedUsers().subscribe(data => {
      this.followerPosts = []
      this.following = data
      this.showSpinner = false

      this.databaseService.getLoggedInUserPosts().subscribe(data => {
        this.userPosts = data
        this.followerPosts.unshift(...this.userPosts)
        this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
        this.following.forEach(follow => {
          this.followingService.getFollowedUsersPosts(follow.followedId).subscribe(data => {
            this.posts = data
            this.followerPosts.unshift(...this.posts)
            this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
            // this.followerPosts = _.sortBy(this.followerPosts, ["createdAt"]);
            // this.followerPosts.reverse();
            console.log("posts", this.followerPosts)
          })
        })
      })
    })
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: InitialUserSearchPage,
      // componentProps: following
    });
    return await modal.present();
  }
}