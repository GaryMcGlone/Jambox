import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { AboutPageModule } from '../about/about.module';
import { HomePageModule } from '../home/home.module';
import { ProfilePageModule } from '../profile/profile.module';
import { NotificationsPageModule } from '../notifications/notifications.module';
import { DiscoverPageModule } from '../discover/discover.module';
import { LandingPageModule } from '../landing/landing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    AboutPageModule,
    ContactPageModule,
    ProfilePageModule,
    NotificationsPageModule,
    DiscoverPageModule,
    LandingPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
