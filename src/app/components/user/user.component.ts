import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { IUser } from '../../interfaces/user-interface';
import { FollowService } from '../../services/follow/follow.service';
import { IFollow } from '../../interfaces/follow.interface';

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

  constructor(private modalController: ModalController, private chatService: ChatService, private firebaseAuth: FirebaseAuthService, private followService: FollowService ) { }

  ngOnInit() {
    this.chatRoom = { members: [] }
    this.followService.getFollowedUsers().subscribe(data => {
      this.following = data
      console.log(this.following)
    })
    this.compareFollow = {
      followedId: this.user.id,
      followerId: this.firebaseAuth.getCurrentUserID()
    }
    
  }

  selectUser() {
    // this.currentUserId = this.firebaseAuth.getCurrentUserID();
    // this.members = [this.currentUserId, this.user.uid];
    // this.chatRoom.members.push(this.currentUserId, this.user.id);
  //  this.chatService.createPrivateChatRoom(this.chatRoom);
   // this.modalController.dismiss();
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
