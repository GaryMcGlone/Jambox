import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics/analytics.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  loggedIn: boolean = true;

  constructor(public analytics: AnalyticsService ) {}

  ngOnInit() {
 
  }

  logEvent() {
    console.log('logging event')
    this.analytics.logButtonClick('tabButton', {param: 'paramValue'})
  }

}
