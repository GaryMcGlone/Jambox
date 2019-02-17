import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController } from "@ionic/angular";
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SearchSongByIdPage } from "../../pages/search-song-by-id/search-song-by-id.page";
// // //import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-youtube-search-result',
  templateUrl: './youtube-search-result.component.html',
  styleUrls: ['./youtube-search-result.component.scss']
})
export class YoutubeSearchResultComponent implements OnInit {
  @Input() item: itemS;
  selectedSong: Post;
  pipe = new DatePipe("en-IE");

  constructor(private modalController: ModalController,
    private databaseService: DatabaseService,
    // // private analytics: AnalyticsService,
    private router: Router) { }

  ngOnInit() {
  }

  selectSong(songId: string, artistName: string, songName: string, albumArt: string) {
    // this.analytics.logButtonClick("selectedYoutubeResult", { param: "User_Tapped_Youtube_Result" });
    const date = new Date();
    const now = this.pipe.transform(date, "medium");

    this.selectedSong = {
      UserID: "",
      songId: songId,
      artistName: artistName,
      songName: songName,
      caption: "",
      albumArt: albumArt,
      createdAt: '',
      externalUri: '',
      previewUrl: '',
      postType: 'yt',
      commentCounter: 0,
      likeCounter: 0
    };
    this.presentModal(this.selectedSong);
  }

  async presentModal(currentSong) {
    // this.analytics.logButtonClick("selectedYoutubeResultModalOpened", { param: "User_Tapped_Youtube_Result_Modal_Opened" });
    let props = {
      post: currentSong
    }
    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: props,
    });
    return await modal.present();
  }

  async searchSongByIdModal(songId) {
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
