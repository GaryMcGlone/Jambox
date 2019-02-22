import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserSearchGroupPage } from './user-search-group.page';

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
  declarations: [UserSearchGroupPage]
})
export class UserSearchGroupPageModule {}
