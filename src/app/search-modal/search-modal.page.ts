import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {


  spotifySelect: boolean = true;
  youtubeSelect: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  goBack() {
    this.modalController.dismiss()
  }

  segmentChanged(event: any) {
    switch (event.target.value) {
      case "spotify":
        this.spotifySelect = true;
        this.youtubeSelect = false;
        break;
      case "youtube":
        this.youtubeSelect = true;
        this.spotifySelect = false;
        break;
    }
  }

  spotifySelectedCheck(): boolean {
    if (this.spotifySelect == true) return true;
    else return false;
  }
  youtubeSelectedCheck(): boolean {
    if (this.youtubeSelect == true) return true;
    else return false;
  }
}
