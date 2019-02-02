import { Component, OnInit } from '@angular/core';
import { GroupChat } from '../../models/group-chat.model';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'group-chat-list',
  templateUrl: './group-chat-list.component.html',
  styleUrls: ['./group-chat-list.component.scss']
})
export class GroupChatListComponent implements OnInit {
  chats: GroupChat[] = [];
  cssClass: string;
  userID: string;
  errorMessage: string;
  showSpinner: boolean = false;

  constructor(
    private chatService: ChatService,
    private auth: FirebaseAuthService
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.userID = this.auth.getCurrentUserID();
    this.chatService.getGroupChatRooms(this.userID).subscribe(chats => {
      this.chats = chats
      error => (this.errorMessage = <any>error);
      this.showSpinner = false;
    });
    this.cssClass = "animated slideInUp faster card";

  }

}
