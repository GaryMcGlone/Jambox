import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController } from "@ionic/angular";
import { DatePipe } from "@angular/common";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SearchSongByIdPage } from "../../pages/search-song-by-id/search-song-by-id.page";
//import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-spotify-search-result",
  templateUrl: "./spotify-search-result.component.html",
  styleUrls: ["./spotify-search-result.component.scss"]
})
export class SpotifySearchResultComponent implements OnInit {
  @Input() item: IItems;
  pipe = new DatePipe("en-IE");
  selectedSong: Post;

  constructor(
    private modalController: ModalController,
    private firebaseAuth: FirebaseAuthService,
  //  private analytics: AnalyticsService
  ) { }

  ngOnInit() { }

  selectSong(songId: string, artistName: string, songName: string, albumArt: string, externalUri: string, previewUrl: string) {
    // this.analytics.logButtonClick("selectedSpotifyResult", { param: "User_Tapped_Spotify_Result" });
    const date = new Date();
    const now = this.pipe.transform(date, "medium");

    this.selectedSong = {
      UserID: this.firebaseAuth.getCurrentUserID(),
      songId: songId,
      artistName: artistName,
      songName: songName,
      caption: "",
      albumArt: albumArt,
      createdAt: now,
      externalUri: externalUri,
      previewUrl: previewUrl,
      postType: 's'
    };
    this.presentModal(this.selectedSong);
  }

  async presentModal(currentSong) {
    // this.analytics.logButtonClick("selectedSpotifyResultModalPresented", { param: "User_Tapped_Spotify_Result_Modal_Opened" });
    let props = {
      post: currentSong
    };
    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: props
    });
    return await modal.present();
  }

  async searchSongByIdModal(songId) {
    // this.analytics.logButtonClick("searchSong", { param: "User_Searched_Song" });
    let props = {
      songId: songId
    };
    const modal = await this.modalController.create({
      component: SearchSongByIdPage,
      componentProps: props
    });
    return await modal.present();
  }


}