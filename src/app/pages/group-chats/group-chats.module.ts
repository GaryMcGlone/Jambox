import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupChatsPage } from './group-chats.page';
import { GroupChatListComponent } from '../../components/group-chat-list/group-chat-list.component';
import { GroupChatComponent } from '../../components/group-chat/group-chat.component';
import { UserGroupComponent } from '../../components/user-group/user-group.component';
import { UserListGroupComponent } from '../../components/user-list-group/user-list-group.component';

const routes: Routes = [
  {
    path: '',
    component: GroupChatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GroupChatsPage,

    GroupChatListComponent,
    GroupChatComponent
  ]
})
export class GroupChatsPageModule {}
