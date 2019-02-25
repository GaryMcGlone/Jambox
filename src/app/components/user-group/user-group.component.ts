import { Component, OnInit, Input } from '@angular/core';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { ModalController } from '@ionic/angular';
import { FollowService } from '../../services/follow/follow.service';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  members: string[];
  chatRoom: IGroupChatRoom;

  constructor(
      private modalController: ModalController, 
      private chatService: ChatService, 
      private firebaseAuth: FirebaseAuthService, 
      private followService: FollowService ) { }

 ngOnInit() {
    this.chatRoom = { members: [], 
                      admin: this.firebaseAuth.getCurrentUserID(),
                      name : ''}
    // this.followService.getFollowedUsers().subscribe(data => {
    //   this.following = data
    //   console.log(this.following)
    // })
    // this.compareFollow = {
    //   followedId: this.user.id,
    //   followerId: this.firebaseAuth.getCurrentUserID()
    // }
    
  }

  selectUser() {
    this.currentUserId = this.firebaseAuth.getCurrentUserID();
    this.members = [this.user.uid];
    this.chatRoom.members = this.members;
    this.chatService.createPrivateChatRoom(this.chatRoom);
    this.modalController.dismiss();
  }
}
