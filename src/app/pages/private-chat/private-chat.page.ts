import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, Events, ToastController } from "@ionic/angular";
import { IPrivateChatRoom } from "../../interfaces/private-chat-room-interface";
import { PrivateChat } from "../../models/private-chat.model";
import { IUser } from "../../interfaces/user-interface";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { ChatService } from "../../services/chat/chat.service";

@Component({
  selector: "app-private-chat",
  templateUrl: "./private-chat.page.html",
  styleUrls: ["./private-chat.page.scss"]
})
export class PrivateChatPage implements OnInit {
  chat: PrivateChat;
  blockedByUser: boolean = false;
  isBlocked: boolean = false;
  otherUser: IUser;
  currentUser: IUser;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private events: Events,
    private auth: FirebaseAuthService,
    private toastCtrl: ToastController,
    private chatService: ChatService
  ) {
    this.chat = this.navParams.get("chat");
  }

  ngOnInit() {

    if(this.otherUser.blockedUsers){
      this.setBlockedStatus(this.auth.getCurrentUserID());}
    
    if(this.currentUser.blockedUsers){
      this.setBlockedStatusForOtherUser(this.otherUser.uid)}
  }

  setBlockedStatusForOtherUser(uid: string){
    if(this.currentUser.blockedUsers.includes(uid)){
      this.isBlocked = true;
    }
    else{
      this.isBlocked = false;
    }
  }

  setBlockedStatus(uid: string){
    if(this.otherUser.blockedUsers.includes(uid)){
      this.blockedByUser = true;
    }else{
      this.blockedByUser = false;
    }
    this.checkIfBlocked();
  }

  checkIfBlocked(){
    if(this.blockedByUser){
      this.modalController.dismiss()
      this.presentToast('You have been blocked by this user')
    }
  }

  blockUser(){
    this.chatService.addBlockedUser(this.otherUser.uid, this.currentUser.uid);
    this.isBlocked = true;
  }

  unBlockUser(){
    this.chatService.removeBlockedUser(this.otherUser.uid, this.currentUser.uid);
    this.isBlocked = false;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
      toast.present();
    }

  closeModal() {
    this.modalController.dismiss();
  }

  goBack() {
    this.modalController.dismiss();
  }
}
