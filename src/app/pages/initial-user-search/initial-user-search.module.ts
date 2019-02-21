import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitialUserSearchPage } from './initial-user-search.page';
import { InitialUserListComponent } from '../../components/initial-user-list/initial-user-list.component';
import { InitialUserResultComponent } from '../../components/initial-user-result/initial-user-result.component';

const routes: Routes = [
  {
    path: '',
    component: InitialUserSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InitialUserSearchPage,    
    InitialUserListComponent,
    InitialUserResultComponent]
})
export class InitialUserSearchPageModule { }
