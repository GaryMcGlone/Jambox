import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileModalPage } from './profile-modal.page';
import { ProfileModalPostListComponent } from '../../components/profile-modal-post-list/profile-modal-post-list.component';
import { ProfileModalPostComponent } from '../../components/profile-modal-post/profile-modal-post.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileModalPage, ProfileModalPostListComponent, ProfileModalPostComponent]
})
export class ProfileModalPageModule {}
