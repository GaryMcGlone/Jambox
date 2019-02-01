import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { IPrivateChatRoom } from "../../interfaces/private-chat-room-interface";
import { PrivateChat } from "../../models/private-chat.model";

@Component({
  selector: "app-private-chat",
  templateUrl: "./private-chat.page.html",
  styleUrls: ["./private-chat.page.scss"]
})
export class PrivateChatPage implements OnInit {
  chat: PrivateChat;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.chat = this.navParams.get("chat");
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  goBack() {
    this.modalController.dismiss();
  }
}
