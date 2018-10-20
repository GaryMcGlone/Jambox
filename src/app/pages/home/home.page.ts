import { Component, ViewChild, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { IPost } from '../../interfaces/post-interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  posts: IPost[] = [];
  errorMessage: string;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){

  }
}
