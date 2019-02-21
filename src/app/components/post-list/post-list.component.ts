import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database/database.service";
import { IPost } from "../../interfaces/post-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IUser } from "../../interfaces/user-interface";
import { IFollow } from "../../interfaces/follow.interface";
import { FollowService } from "../../services/follow/follow.service";
import { ModalController } from "@ionic/angular";
import { UserSearchPage } from "../../pages/user-search/user-search.page";
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

  constructor(private databaseService: DatabaseService, private auth: FirebaseAuthService, private followingService: FollowService, private modalController: ModalController) { }

  ngOnInit() {
    this.showSpinner = true;

    this.databaseService.getCurrentUser(this.auth.getCurrentUserID()).subscribe(data => {
      this.user = data
    });

    this.followingService.getFollowedUsers().subscribe(data => {
      this.following = data
      this.showSpinner = false

      this.databaseService.getLoggedInUserPosts().subscribe(data => {
        this.userPosts = data
        this.followerPosts.push(...this.userPosts)

        this.following.forEach(follow => {
          this.followingService.getFollowedUsersPosts(follow.followedId).subscribe(data => {
            this.posts = data
            this.followerPosts.push(...this.posts)
            this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
            this.followerPosts = _.sortBy(this.followerPosts, ["createdAt"]);
            this.followerPosts.reverse();
          })
        })
      })
    })
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: UserSearchPage,
      // componentProps: following
    });
    return await modal.present();
  }
}