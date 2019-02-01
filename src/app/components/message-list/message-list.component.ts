import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  @Input() chat;
  messages: IChatMessage[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChatRoomMessages(this.chat.id).subscribe(messages => {
      this.messages = messages
      this.messages.reverse();
    });
  }

}
