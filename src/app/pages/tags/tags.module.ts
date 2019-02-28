import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TagsPage } from './tags.page';
import { TagComponent } from '../../components/tag/tag.component';
import { TagsListComponent } from '../../components/tags-list/tags-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: TagsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    
  ],
  declarations: [TagsPage, TagsListComponent,
    TagComponent]
})
export class TagsPageModule { }
