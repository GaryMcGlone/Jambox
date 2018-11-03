import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { DiscoverPage } from "./discover.page";
import { NewReleaseComponent } from "../../components/new-release/new-release.component";
import { NewReleasesListComponent } from "../../components/new-releases-list/new-releases-list.component";
import { CurrentPlayingComponent } from "../../components/current-playing/current-playing.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DiscoverPage, NewReleaseComponent, NewReleasesListComponent,CurrentPlayingComponent]
})
export class DiscoverPageModule {}
