import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserSearchGroupPage } from './user-search-group.page';
import { UserListGroupComponent } from '../../components/user-list-group/user-list-group.component';
import { UserGroupComponent } from '../../components/user-group/user-group.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserSearchGroupPage,     
    UserListGroupComponent,
    UserGroupComponent,]
})
export class UserSearchGroupPageModule {}
