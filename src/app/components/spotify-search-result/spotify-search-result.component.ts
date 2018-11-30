import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post.model";
import { CreateSongModalPage } from "../../pages/create-song-modal/create-song-modal.page";
import { ModalController, NavParams } from "@ionic/angular";
import { DatePipe } from "@angular/common";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { DatabaseService } from "../../services/database/database.service";
import { Router } from "@angular/router";

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
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() { }

  selectSong(songId: string, artistName: string, songName: string, albumArt: string, externalUri: string, previewUrl: string) {
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
    let props = {
      post: currentSong
    };
    const modal = await this.modalController.create({
      component: CreateSongModalPage,
      componentProps: props
    });
    return await modal.present();
  }

  performSearch(id) {
    console.log(id)
    this.databaseService.searchForASong(id).subscribe(data => console.log(data))
    this.router.navigateByUrl('/searchSongById/' + id)
  }
}