import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  loggedIn: boolean = true;

  constructor(private router: Router) {}

  swipeEvent(event) {
    switch(event.direction){
      case 2: this.router.navigate(['/tabs/(discover:discover)']);
              break;
      default: break;
    }
  }
}
