import { Component, OnInit } from '@angular/core';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { PrivateChat } from '../../models/private-chat.model';

@Component({
  selector: 'private-chat-list',
  templateUrl: './private-chat-list.component.html',
  styleUrls: ['./private-chat-list.component.scss']
})
export class PrivateChatListComponent implements OnInit {
  chats: PrivateChat[] = [];
  cssClass: string;
  userID: string;
  errorMessage: string;
  showSpinner: boolean = false;

  constructor(
    private chatService: ChatService,
    private auth: FirebaseAuthService
  ) { }

  ngOnInit() {
    //get all the private chat rooms
    this.showSpinner = true;
    this.userID = this.auth.getCurrentUserID();
    console.log("user id: ", this.userID)
    this.chatService.getPrivateChatRooms(this.userID).subscribe(chats => {
      this.chats = chats
      console.log("In chat list: 2", this.chats)
      error => (this.errorMessage = <any>error);
      this.showSpinner = false;
    });
    console.log("In chat list: ", this.chats)
    this.cssClass = "animated slideInUp faster card";
  }

}
