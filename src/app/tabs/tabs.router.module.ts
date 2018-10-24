import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { NotificationsPage } from '../pages/notifications/notifications.page';
import { DiscoverPage } from '../pages/discover/discover.page';
import { LandingPage } from '../pages/landing/landing.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'profile',
        outlet: 'profile',
        component: ProfilePage
      },
      {
        path: 'notifications',
        outlet: 'notifications',
        component: NotificationsPage
      },
      {
        path: 'discover',
        outlet: 'discover',
        component: DiscoverPage
      },
      {
        path: 'landing',
        outlet: 'landing',
        component: LandingPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
