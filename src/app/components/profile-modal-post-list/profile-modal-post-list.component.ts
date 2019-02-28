import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../../interfaces/post-interface';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-profile-modal-post-list',
  templateUrl: './profile-modal-post-list.component.html',
  styleUrls: ['./profile-modal-post-list.component.scss']
})
export class ProfileModalPostListComponent implements OnInit {

  @Input() userId: string;
  public userPosts: IPost[];
  constructor(public db: DatabaseService) { }

  ngOnInit() {
    this.db.getPostByID(this.userId).subscribe(data => {
      this.userPosts = data
    })
  }

}
