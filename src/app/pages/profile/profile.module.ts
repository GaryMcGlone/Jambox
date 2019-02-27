import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ProfilePostListComponent } from '../../components/profile-post-list/profile-post-list.component';
import { ProfilePostComponent } from '../../components/profile-post/profile-post.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProfileLikedPostListComponent } from '../../components/profile-liked-post-list/profile-liked-post-list.component';
import { ProfileLikedPostComponent } from '../../components/profile-liked-post/profile-liked-post.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [
    ProfilePage,  
    ProfilePostListComponent, 
    ProfilePostComponent,
    ProfileLikedPostListComponent,
    ProfileLikedPostComponent  
  ]
})
export class ProfilePageModule {}
