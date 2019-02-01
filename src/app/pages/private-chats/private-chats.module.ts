import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PrivateChatsPage } from "./private-chats.page";
import { PrivateChatListComponent } from "../../components/private-chat-list/private-chat-list.component";
import { PrivateChatComponent } from "../../components/private-chat/private-chat.component";

const routes: Routes = [
  {
    path: "",
    component: PrivateChatsPage
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
    PrivateChatsPage,
    PrivateChatListComponent,
    PrivateChatComponent
  ]
})
export class PrivateChatsPageModule {}
