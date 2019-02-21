import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from "../../components/post/post.component"
import { PostListComponent } from "../../components/post-list/post-list.component";
import { HomePage } from './home.page';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';
import { Routes, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ActionSheetComponent } from '../../components/action-sheet/action-sheet.component';
import { InitialUserSearchPage } from '../initial-user-search/initial-user-search.page';
import { InitialUserListComponent } from '../../components/initial-user-list/initial-user-list.component';
import { InitialUserResultComponent } from '../../components/initial-user-result/initial-user-result.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [HomePage, PostComponent, PostListComponent, DateTimeConvertPipe, ActionSheetComponent, InitialUserSearchPage, InitialUserListComponent, InitialUserResultComponent],
  entryComponents: [InitialUserSearchPage]
})
export class HomePageModule {}
