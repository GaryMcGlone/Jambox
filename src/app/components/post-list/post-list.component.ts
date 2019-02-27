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
import * as _ from "lodash";
import { InitialUserSearchPage } from "../../pages/initial-user-search/initial-user-search.page";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  followerPosts: IPost[] = [];
  filteredPosts: IPost[] = [];
  following: IFollow[] = [];
  userPosts: IPost[] = [];
  showSpinner: boolean = false;

  constructor(private databaseService: DatabaseService, 
    private auth: FirebaseAuthService, 
    private followingService: FollowService, 
    private modalController: ModalController, 
    // private analytics: AnalyticsService
    ) { }

  ngOnInit() {
    // this.analytics.log("userBrowsingFeed", { param: "User_Browsing_Feed" } )
    this.showSpinner = true;

    this.followingService.getFollowedUsers().subscribe(data => {
      this.following = data;
      this.showSpinner = false

      this.databaseService.getLoggedInUserPosts().subscribe(data => {
        let counter = 1;
        if(counter = 1)
        {
          this.followerPosts = [];
          this.posts = [];
          this.userPosts = [];
        }
        this.userPosts = data
        this.followerPosts.unshift(...this.userPosts)
        this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
      
        this.following.forEach(follow => {
          this.followingService.getFollowedUsersPosts(follow.followedId).subscribe(data => {
            this.posts = data
            this.followerPosts.unshift(...this.posts)
            this.followerPosts = _.uniqBy([...this.followerPosts, ...this.userPosts], 'id');
            this.followerPosts.sort(function(obj1, obj2) {
              return  obj2.createdAt.seconds - obj1.createdAt.seconds
            })
          })
        })
      })
    })
  }

  async presentModal() {
    // this.analytics.log("clickedSearchPopup", { param: "Clicked_Search_Popup" } )
    const modal = await this.modalController.create({
      component: InitialUserSearchPage,
    });
    return await modal.present();
  }
}