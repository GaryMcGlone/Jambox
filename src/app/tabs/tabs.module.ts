import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs.router.module";

import { TabsPage } from "./tabs.page";
import { HomePageModule } from "../pages/home/home.module";
import { ProfilePageModule } from "../pages/profile/profile.module";
import { NotificationsPageModule } from "../pages/notifications/notifications.module";
import { DiscoverPageModule } from "../pages/discover/discover.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SearchModalPage } from "../pages/search-modal/search-modal.page";
import { SpotifySearchComponent } from "../components/spotify-search/spotify-search.component";
import { YoutubeSearchComponent } from "../components/youtube-search/youtube-search.component";
import { SpotifySearchResultComponent } from "../components/spotify-search-result/spotify-search-result.component";
import { YoutubeSearchResultComponent } from "../components/youtube-search-result/youtube-search-result.component";

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
    FontAwesomeModule
  ],
  declarations: [
    TabsPage,
    SearchModalPage,
    SpotifySearchComponent,
    YoutubeSearchComponent,
    SpotifySearchResultComponent,
    YoutubeSearchResultComponent
  ],
  entryComponents: [SearchModalPage]
})
export class TabsPageModule {}
