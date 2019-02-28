import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services/tags/tags.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: any[];
  constructor(private tagsService:TagsService) { }

  ngOnInit() {
    this.tagsService.getTags().subscribe(tags => {
      this.tags = tags
    })
  }

}
