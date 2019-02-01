import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {
  @Input() chat;
  message: IChatMessage;
  pipe = new DatePipe("en-IE");
  content: string;
  buttonIsDisabled: boolean = true;

  constructor(private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.message.chatRoomID = this.chat.id;
    this.message.message = "";
    this.message.senderID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser(this.message.senderID).subscribe(user => {
      this.message.senderName = user.displayName
    });
  }

  disableButton(): boolean {
    this.buttonIsDisabled = true;
    if (this.content.match(/^\s+$/) === null && this.content != '') {
      return this.buttonIsDisabled = false;
    }
    else {
      return this.buttonIsDisabled = true;
    }
  }

  sendMessage() {
    const date = new Date();
    this.message.createdAt = this.pipe.transform(date, "medium");
    this.message.message = this.content;
    this.chatService.createChatMessage(this.message);
    this.content = '';
    this.buttonIsDisabled = true;
  }

}
