import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';
import { NotificationComponent } from '../../components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
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
    NotificationsPage,
    NotificationListComponent,
    NotificationComponent
  ]
})
export class NotificationsPageModule {}
