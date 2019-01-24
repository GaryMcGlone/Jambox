import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommentsPage } from './comments.page';
import { AddCommentComponent } from '../../components/add-comment/add-comment.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { SelectedPostComponent } from '../../components/selected-post/selected-post.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: '',
    component: CommentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommentsPage,
    AddCommentComponent,
    CommentComponent,
    CommentListComponent,
    SelectedPostComponent]
})
export class CommentsPageModule {}
