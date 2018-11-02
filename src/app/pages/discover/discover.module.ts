import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DiscoverPage } from "./discover.page";
import { NewReleaseComponent } from "../../components/new-release/new-release.component";
import { NewReleasesListComponent } from "../../components/new-releases-list/new-releases-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DiscoverPage, NewReleaseComponent, NewReleasesListComponent]
})
export class DiscoverPageModule {}
