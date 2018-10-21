import { Component, ViewChild } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router'; 
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  loggedIn: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("aaaa");
    this.router.navigate(['login'])
  }

}
