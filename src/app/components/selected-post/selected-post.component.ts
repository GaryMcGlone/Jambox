import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.scss']
})
export class SelectedPostComponent implements OnInit {
  @Input() post;

  constructor() { }

  ngOnInit() {
  }

}
