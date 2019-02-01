import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivateChatPage } from './private-chat.page';
import { MessageListComponent } from "../../components/message-list/message-list.component";
import { MessageAddComponent } from "../../components/message-add/message-add.component";
import { MessageComponent } from "../../components/message/message.component";
import { PrivateChatComponent } from '../../components/private-chat/private-chat.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateChatPage
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
    PrivateChatPage,    
    MessageComponent,
    MessageAddComponent,
    MessageListComponent,
   // PrivateChatComponent,

  ]
})
export class PrivateChatPageModule {}
