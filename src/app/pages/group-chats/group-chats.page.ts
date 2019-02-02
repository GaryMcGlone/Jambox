import { Component, OnInit } from '@angular/core';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.page.html',
  styleUrls: ['./group-chats.page.scss'],
})
export class GroupChatsPage implements OnInit {
  groupChatRooms: IGroupChatRoom[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }

  goBack(){
    this.modalController.dismiss();
  }

}
