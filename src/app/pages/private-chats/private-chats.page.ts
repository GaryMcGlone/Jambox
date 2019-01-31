import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-private-chats',
  templateUrl: './private-chats.page.html',
  styleUrls: ['./private-chats.page.scss'],
})
export class PrivateChatsPage implements OnInit {
  privateChatRooms: IPrivateChatRoom[] = [];
  
  constructor(private chatService: ChatService,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }

  goBack() {
    this.modalController.dismiss()
  }

}
