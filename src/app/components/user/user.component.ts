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

  constructor(private modalController: ModalController, private chatService: ChatService, private firebaseAuth: FirebaseAuthService, private followService: FollowService,/* private analytics: AnalyticsService*/ ) { }

  ngOnInit() {
    // this.blockedBool = this.checkIfBlocked(this.firebaseAuth.getCurrentUserID())
    this.chatRoom = { members: [] }
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data
    })
    this.compareFollow = {
      followedId: this.user.id,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
    
  }

  checkIfBlocked(uid: string): boolean {
    if(this.blockedUsers.includes(uid))
      return true;
    else
      return false;
  }

  selectUser() {
  //  this.analytics.log("selectedUserToChat", { param: "Selected_User_ToChat" } )
    this.currentUserId = this.firebaseAuth.getCurrentUserID();
    this.members = [this.currentUserId, this.user.uid];
    this.chatRoom.members = this.members;
    this.chatService.createPrivateChatRoom(this.chatRoom);
    this.modalController.dismiss();
  }

  follow(user) {
    //this.analytics.log("followInChatView", { param: "Follow_InChatView" } )
    if (this.buttonFill == "outline") {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
      let follow: IFollow = {
        followedId: user.id,
        followerId: this.firebaseAuth.getCurrentUserID()
      }
     this.followService.addFollow(follow)
    } else {
     // this.analytics.log("unfollowInChatView", { param: "Unfollow_InChatView" } )
      this.btnValue = "follow";
      this.buttonFill = "outline";
      this.followService.removeFollowing(this.compareFollow.id)
    }
  }
  
}
