import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController } from "@ionic/angular";
import { DatabaseService } from "../../services/database/database.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-spotify-search-result",
  templateUrl: "./spotify-search-result.component.html",
  styleUrls: ["./spotify-search-result.component.scss"]
})
export class SpotifySearchResultComponent implements OnInit {
  @Input()
  item: IItems;
  pipe = new DatePipe("en-IE");
  constructor(private modalController: ModalController, private databaseService: DatabaseService) {}

  ngOnInit() {}

  selectSong(songId: string, artistName: string, songName: string, albumArt: string) {
    
    const date = new Date();
    const now = this.pipe.transform(date, "medium");

    let currentSong = {
      songId: songId,
      artistName: artistName,
      songName: songName,
      albumArt: albumArt, 
      createdAt: now
    };
    this.presentModal(currentSong);
  }

  async presentModal(currentSong) {
    console.log(currentSong)
    let props = {
      post: currentSong
    }

    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: props, 
    });
    return await modal.present();
  }
}
