import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/firebaseAuth/auth-guard.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' , canActivate: [AuthGuard]},
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule', canActivate: [AuthGuard] },
  { path: 'discover', loadChildren: './pages/discover/discover.module#DiscoverPageModule', canActivate: [AuthGuard] },
  { path: 'create-song', loadChildren: './pages/create-song-modal/create-song-modal.module#CreateSongModalPageModule' ,canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signUp', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
  { path: 'searchSongById/:songId', loadChildren: './pages/search-song-by-id/search-song-by-id.module#SearchSongByIdPageModule',canActivate: [AuthGuard] },
  { path: 'comments', loadChildren: './pages/comments/comments.module#CommentsPageModule' },
  { path: 'search-modal', loadChildren: './pages/search-modal/search-modal.module#SearchModalPageModule' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
