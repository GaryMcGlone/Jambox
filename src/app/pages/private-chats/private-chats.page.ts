import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { ModalController } from '@ionic/angular';
import { UserSearchPage } from '../user-search/user-search.page';

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

  async presentAddChatModal() {
    let type = "private";
    var props = {
      type
    }
    
    const modal = await this.modalController.create({
      component: UserSearchPage
    });
    return await modal.present();
  }

}
