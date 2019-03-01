import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaggedPostsPage } from './tagged-posts.page';
import { TaggedPostsListComponent } from '../../components/tagged-posts-list/tagged-posts-list.component';
import { TaggedPostComponent } from '../../components/tagged-post/tagged-post.component';

const routes: Routes = [
  {
    path: '',
    component: TaggedPostsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaggedPostsPage, TaggedPostsListComponent, TaggedPostComponent,]
})
export class TaggedPostsPageModule {}
