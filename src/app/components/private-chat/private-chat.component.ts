import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { PrivateChat } from '../../models/private-chat.model';
import { IUser } from '../../interfaces/user-interface';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  @Input() chat: PrivateChat;

  lastMessage: IChatMessage[];
  userId: string;
  otherUser: IUser;


  constructor(
    private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.userId = this.firebaseAuth.getCurrentUserID();
    this.chat.members.forEach(element => {
      if(element != this.userId){
        this.databaseService.getCurrentUser(element).subscribe(data => {
          this.otherUser = data
        });
      }
    });
    this.chatService.getLastChatRoomMessage(this.chat.id).subscribe(message => {
      this.lastMessage = message;
    });
  }
 
}
