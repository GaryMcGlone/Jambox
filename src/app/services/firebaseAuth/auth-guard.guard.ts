import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from "./firebase-auth.service"
import { SpotifyService } from '../spotify/spotify.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: FirebaseAuthService, private router: Router, private spotifyService: SpotifyService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.isLoggedIn()) {
        return true;
      }
      console.log("access denied");
      this.router.navigate(['login'])
      return false;
  }
}