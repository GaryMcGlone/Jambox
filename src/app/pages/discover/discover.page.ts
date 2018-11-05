import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
