import { Component, OnInit, Input } from '@angular/core';
import { Results } from "../../interfaces/new-release.interface";

@Component({
  selector: 'app-new-release',
  templateUrl: './new-release.component.html',
  styleUrls: ['./new-release.component.scss']
})
export class NewReleaseComponent implements OnInit {
  @Input() album: Results;
  constructor() { }

  ngOnInit() {
  }

}
