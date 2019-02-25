import { Component, OnInit, Input } from '@angular/core';
import { IFollow } from '../../interfaces/follow.interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-general-user-search-result',
  templateUrl: './general-user-search-result.component.html',
  styleUrls: ['./general-user-search-result.component.scss']
})
export class GeneralUserSearchResultComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  btnValue = "follow";
  private buttonFill = "outline";
  private compareFollow: IFollow
  private following: IFollow[];
  private isFollowing: boolean;

  constructor(private firebaseAuth: FirebaseAuthService, private followService: FollowService, private analytics: AnalyticsService) { }

  ngOnInit() {
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data

      this.compareFollow = {
        followedId: this.user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      this.following.forEach(element => {
        if(element.followerId == this.compareFollow.followerId && 
          element.followedId == this.compareFollow.followedId){
          this.btnValue = "unfollow"
          this.buttonFill = "solid"
          this.isFollowing = true
        }
      });
      this.followService.getSpecificFollow(this.user.id, this.firebaseAuth.getCurrentUserID()).subscribe(data => {
        this.compareFollow = data[0]
      })
    })

  }

  follow(user) {
    this.analytics.log("followInUserSearch", { param: "Followed_InUserSearch" } )
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
     
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      this.followService.addFollow(follow)
    
    }

  unfollow() {
    this.analytics.log("UnfollowInUserSearch", { param: "Unfollowed_InUserSearch" } )
    this.btnValue = "follow";
    this.buttonFill = "outline";
    this.followService.removeFollowing(this.compareFollow.id)
  }
}
