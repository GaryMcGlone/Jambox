import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { IUser } from '../../interfaces/user-interface';
import { FollowService } from '../../services/follow/follow.service';
import { IFollow } from '../../interfaces/follow.interface';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  members: string[];
  chatRoom: IPrivateChatRoom;
  private btnValue = "follow";
  private buttonFill = "outline";
  private compareFollow: IFollow
  private following: IFollow[];
  private blockedUsers: string[];
  blockedBool: boolean = false;
  public followCount: number; 
  public isFollowing: boolean;

  constructor(private modalController: ModalController, private chatService: ChatService, private firebaseAuth: FirebaseAuthService, private followService: FollowService,private analytics: AnalyticsService ) { }

  ngOnInit() {
    this.followService.getFollowedUsersForUID(this.user.uid).subscribe(data => this.followCount = data.length)
    // this.blockedBool = this.checkIfBlocked(this.firebaseAuth.getCurrentUserID())
    this.chatRoom = { members: [] }
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
    })

    this.followService.getSpecificFollow(this.user.id, this.firebaseAuth.getCurrentUserID()).subscribe(data => {
      this.compareFollow = data[0]
    })    
  }

  checkIfBlocked(uid: string): boolean {
    if(this.blockedUsers.includes(uid))
      return true;
    else
      return false;
  }

  selectUser() {
   this.analytics.log("selectedUserToChat", { param: "Selected_User_ToChat" } )
    this.currentUserId = this.firebaseAuth.getCurrentUserID();
    this.members = [this.currentUserId, this.user.uid];
    this.chatRoom.members = this.members;
    this.chatService.createPrivateChatRoom(this.chatRoom);
    this.modalController.dismiss();
  }

  follow(user, event: Event) {
    event.stopPropagation();
    this.analytics.log("followInUserSearch", { param: "Followed_InUserSearch" } )
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
     
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
      this.followService.addFollow(follow)
    }
    
  unfollow(event: Event) {
    event.stopPropagation()
    this.analytics.log("UnfollowInUserSearch", { param: "Unfollowed_InUserSearch" } )
    this.btnValue = "follow";
    this.buttonFill = "outline";
    this.followService.removeFollowing(this.compareFollow.id);
    this.isFollowing = false;
  }
}
