import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchSongByIdPage } from './search-song-by-id.page';
import { SearchResultComponent } from '../../components/search-result/search-result.component';
import { SearchResultListComponent } from "../../components/search-result-list/search-result-list.component";

const routes: Routes = [
  {
    path: '',
    component: SearchSongByIdPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchSongByIdPage, SearchResultComponent, SearchResultListComponent ]
})
export class SearchSongByIdPageModule { }
