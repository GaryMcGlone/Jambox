import { Component, OnInit, Input } from '@angular/core';
import { IFollow } from '../../interfaces/follow.interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { DatabaseService } from '../../services/database/database.service';
import { ModalController } from '@ionic/angular';
import { ProfileModalPage } from '../../pages/profile-modal/profile-modal.page';

@Component({
  selector: 'app-initial-user-result',
  templateUrl: './initial-user-result.component.html',
  styleUrls: ['./initial-user-result.component.scss']
})
export class InitialUserResultComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  private btnValue = "follow";
  private buttonFill = "outline";
  private compareFollow: IFollow
  private following: IFollow[];
  private followCount: number;


  constructor(private firebaseAuth: FirebaseAuthService, private db: DatabaseService, private followService: FollowService, private modalController: ModalController
    //  private analytics: AnalyticsService
     ) { }

  ngOnInit() {
    this.followService.getFollowedUsersForUID(this.user.uid).subscribe(data => this.followCount = data.length)
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data
    })
    this.compareFollow = {
      followedId: this.user.id,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
    this.followService.getSpecificFollow(this.user.id, this.firebaseAuth.getCurrentUserID()).subscribe(data => {
      this.compareFollow = data[0]
    })
  }

  follow(user, event: Event) {
    event.stopPropagation();
    if (this.buttonFill == "outline" && this.compareFollow == null) {
      // this.analytics.log("followInUserPopupSearch", { param: "Followed_InPopupSearch" } )
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      this.followService.addFollow(follow)
    } else {
      // this.analytics.log("unfollowInUserPopupSearch", { param: "Unfollowed_InPopupSearch" } )
      this.btnValue = "follow";
      this.buttonFill = "outline";
      this.followService.removeFollowing(this.compareFollow.id)
    }
  }
  async  viewProfile() {
    const modal = await this.modalController.create({
      component: ProfileModalPage,
      componentProps: { userId: this.user.uid }
    });
    return await modal.present();
  }
}