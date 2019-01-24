import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SearchModalPage } from "./search-modal.page";
import { SpotifySearchComponent } from "../../components/spotify-search/spotify-search.component";
import { YoutubeSearchComponent } from "../../components/youtube-search/youtube-search.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SpotifySearchResultComponent } from "../../components/spotify-search-result/spotify-search-result.component";
import { YoutubeSearchResultComponent } from "../../components/youtube-search-result/youtube-search-result.component";

const routes: Routes = [
  {
    path: "",
    component: SearchModalPage
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
    SearchModalPage,
    SpotifySearchComponent,
    YoutubeSearchComponent,
    SpotifySearchResultComponent,
    YoutubeSearchResultComponent
  ],
  entryComponents: [SearchModalPage]
})
export class SearchModalPageModule {}
