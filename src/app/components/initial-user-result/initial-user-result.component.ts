import { Component, OnInit, Input } from '@angular/core';
import { IFollow } from '../../interfaces/follow.interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { FollowService } from '../../services/follow/follow.service';

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

  constructor(private firebaseAuth: FirebaseAuthService, private followService: FollowService) { }

  ngOnInit() {
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data
      console.log(this.following)
    })
    this.compareFollow = {
      followedId: this.user.id,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
  }


  follow(user) {
    console.log("adding follow", user)
    if (this.buttonFill == "outline") {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      console.log("follow", follow)
      this.followService.addFollow(follow)
    } else {
      console.log("removing follow")
      this.btnValue = "follow";
      this.buttonFill = "outline";
      // this.followService.removeFollowing(follow.id)
    }
  }
}