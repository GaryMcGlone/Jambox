import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageListComponent implements OnInit {
  @Input() chat;
  @ViewChild(IonContent) content : IonContent;
  messages: IChatMessage[] = [];
  doIt: boolean = true;
  showSpinner: boolean = true;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatRoomMessages(this.chat.id).subscribe(messages => {
      this.messages = messages
      this.doIt = true;
      this.toBottom();
    });
  }

  toBottom(): void {
      setTimeout(() => {
        this.content.scrollToBottom(300);
        this.showSpinner = false;
      });
  }

}
