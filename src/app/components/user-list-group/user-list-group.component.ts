import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user-interface';
import { Events, ToastController, ModalController } from '@ionic/angular';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-user-list-group',
  templateUrl: './user-list-group.component.html',
  styleUrls: ['./user-list-group.component.scss']
})
export class UserListGroupComponent implements OnInit {
  users: IUser[] = [];
  startAt: string;
  groupChat: IGroupChatRoom;
  endAt: string;
  showSpinner: boolean = false;
  memberList: IUser[] = [];
  memberListString: string[] = [];
  groupName: string = "";

  constructor(
    private userService: UsersService,
    public events: Events,
    private chatService: ChatService,
    private auth: FirebaseAuthService,
    private toastCtrl: ToastController,
    private modalController: ModalController
    ) { 
      this.events.subscribe('member-add', data => {
        if(!this.memberListString.includes(data.uid)){
          this.memberList.push(data);
          this.memberListString.push(data.uid);
        }else{
          this.presentToast(`${data.displayName} is already added to the list`);
        }
        console.log(this.memberList);
      });
    }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

 search($event) {
   let q: string = $event.target.value;
   if (q) {
     this.userService.getUsersByQuery(q.toLowerCase()).subscribe(users => {
       this.users = users
     })
   } else {
     this.users = []
     this.userService.getAllUsers().subscribe(data => {
       this.users = data
     })
   }
 }

 groupNameUpdate($event) {
   if($event.target.value.length > 35){
    this.presentToast('Group name too long')
   }else {
    this.groupName = $event.target.value
   }
 }

 memberDelete(uid: string, member: any): void {
  this.memberList.forEach((item, index) => {
    if(item === member) 
      this.memberList.splice(index, 1);
  });
  this.memberListString.forEach((item, index) => {
    if(item === uid)
      this.memberListString.splice(index, 1);
  });
 }

 saveGroup(): void {
   if(this.groupName.length >= 5 && this.groupName.charAt(0) != ' '){
    this.memberListString.push(this.auth.getCurrentUserID())
    this.groupChat = {
      admin: this.auth.getCurrentUserID(),
      members: this.memberListString,
      name: this.groupName
    }
    this.chatService.createGroupChatRoom(this.groupChat);
    this.modalController.dismiss();
   }
   else if(this.groupName.length < 5){
    this.presentToast('Group chat name has to be atleast 5 characters long')
   }
   else {
     this.presentToast('Group chat name cannot start with white space');
   }
 }

 async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 2000,
    position: "top"
  });
    toast.present();
  }
}
