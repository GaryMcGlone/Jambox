import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../pages/home/home.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { DiscoverPageModule } from '../pages/discover/discover.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    ProfilePageModule,
    NotificationsPageModule,
    DiscoverPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
