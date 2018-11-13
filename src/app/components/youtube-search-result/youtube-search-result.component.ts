import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController } from "@ionic/angular";
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-youtube-search-result',
  templateUrl: './youtube-search-result.component.html',
  styleUrls: ['./youtube-search-result.component.scss']
})
export class YoutubeSearchResultComponent implements OnInit {
  @Input() item: itemS;
  selectedSong: Post;
  pipe = new DatePipe("en-IE");

  constructor(private modalController: ModalController, private databaseService: DatabaseService) {}

  ngOnInit() {
  }

  selectSong(songId: string, artistName: string, songName: string, albumArt: string) {
    const date = new Date();
    const now = this.pipe.transform(date, "medium");

    this.selectedSong = {
      UserID: "",
      songId: songId,
      artistName: artistName,
      songName: songName,
      caption: "",
      albumArt: albumArt,
      createdAt: now
    };
    this.presentModal(this.selectedSong);
  }

  async presentModal(currentSong) {
    let props = {
      post: currentSong
    }
    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: props,
    });
    return await modal.present();
  }

  performSearch(songId) {
    console.log("searching for: ", songId);
    this.databaseService.searchForASong(songId).subscribe(posts => {
      console.log(posts);
    })
  }
}
