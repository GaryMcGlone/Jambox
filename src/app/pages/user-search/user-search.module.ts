import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserSearchPage } from './user-search.page';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserComponent } from '../../components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserSearchPage, UserListComponent,
    UserComponent,]
})
export class UserSearchPageModule {}
