import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/user.model';
import { IUser } from "../../interfaces/user-interface";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"]
})
export class SignUpPage implements OnInit {
  constructor(
    private auth: FirebaseAuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private usersService: UsersService,
    //private analytics: AnalyticsService
  ) {}

  passwordErrorBool = false;
  usernames: IUser[] = [];

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {}

  checkUsername($event){
    let displayName: string = $event.target.value;
    this.usersService.checkIfUsernameExists(displayName).subscribe(users => {
      this.usernames = users
    })
  }

  checkPassword($event, password){
    let confirmPassword: string = $event.target.value;
    if(password.value !== confirmPassword){
      this.passwordErrorBool = true;
    }
    else{
      this.passwordErrorBool = false;
    }
  }

  signUp(email: string, password: string, confirmPassword:string, displayName: string) {
  //  this.analytics.log("signUp", { param: "User_Sign_Up" });
    this.auth.signUp(email, password, displayName);
  }

  navigateToLogin() {
    this.router.navigate(["login"]);
  }
}
