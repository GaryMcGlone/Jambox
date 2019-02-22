import { Component, OnInit, Input } from '@angular/core';
import { IFollow } from '../../interfaces/follow.interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { FollowService } from '../../services/follow/follow.service';

@Component({
  selector: 'app-general-user-search-result',
  templateUrl: './general-user-search-result.component.html',
  styleUrls: ['./general-user-search-result.component.scss']
})
export class GeneralUserSearchResultComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  private btnValue = "follow";
  private buttonFill = "outline";
  private compareFollow: IFollow
  private following: IFollow[];

  constructor(private firebaseAuth: FirebaseAuthService, private followService: FollowService) { }

  ngOnInit() {
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data    
      this.checkFollowing(this.following)
    })
    this.compareFollow = {
      followedId: this.user.id,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
    this.followService.getSpecificFollow(this.user.id, this.firebaseAuth.getCurrentUserID()).subscribe(data => {
      this.compareFollow = data[0]
      console.log("compare follow:", this.compareFollow)
    })
  }

  checkFollowing(following: IFollow[]) : boolean {
    if (following.includes(this.compareFollow)) {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
      return true
    }
    else {
      this.btnValue = "follow";
      this.buttonFill = "outline";
      return false
    }
  }

  follow(user) {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
     
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      this.followService.addFollow(follow)
    
    }

  unfollow(id) {
    this.btnValue = "follow";
    this.buttonFill = "outline";

    this.followService.removeFollowing(this.compareFollow.id)
  }
}
