import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-loginmenu',
  templateUrl: './loginmenu.page.html',
  styleUrls: ['./loginmenu.page.scss'],
})
export class LoginmenuPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
  goToSignup() {
    this.router.navigate(['signUp']);
  }
}
