import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services/tags/tags.service';
import { ITag } from '../../interfaces/tag-interface';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: ITag[];
  taggedPostsCount: number
  constructor(private tagsService:TagsService) { }

  ngOnInit() {
    this.tagsService.getTags().subscribe(tags => {
      this.tags = tags
    })
  
  }

  
  search($event) {
    // this.analytics.log("searchedUserInSearchPage", { param: "User_Searched_SearchPage" } )
    let q: string = $event.target.value;
    if (q) {
      this.tagsService.getTagsByQuery(q.toLowerCase()).subscribe(tags => {
        this.tags = tags
      })
    } else {
      this.tags = []
      this.tagsService.getTags().subscribe(data => {
        this.tags = data
      })
    }
  }
}
