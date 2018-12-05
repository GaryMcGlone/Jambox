import { Component, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from "@ionic/angular";
import { FirebaseAuth } from '@angular/fire';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-search-song-by-id',
  templateUrl: './search-song-by-id.page.html',
  styleUrls: ['./search-song-by-id.page.scss'],
})
export class SearchSongByIdPage implements OnInit {

  searchResults: IPost[] = [];

  constructor(private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router, 
    private modalController: ModalController,
    private navParams: NavParams,
    private firebaseAuth: FirebaseAuthService) {
  }
  //spotify:album:6ZksrxRWlJ7ExylPyJwfLJ
  songId: string;

  ngOnInit() {
    console.log(this.navParams);
    this.songId = this.navParams.get("songId");
    this.getPostsByID(this.songId)
  }
  getPostsByID(songId: string) {
    this.databaseService.searchForASong(songId).subscribe(data => {
      console.log(data), this.searchResults = data
    })
  }                   
  closeModal() {
    this.modalController.dismiss();
  }

}
