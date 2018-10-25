import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostComponent } from "../../components/post/post.component"
import { PostListComponent } from "../../components/post-list/post-list.component";
import { HomePage } from './home.page';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [HomePage, PostComponent, PostListComponent, DateTimeConvertPipe]
})
export class HomePageModule {}
