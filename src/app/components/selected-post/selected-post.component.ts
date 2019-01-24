import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.scss']
})
export class SelectedPostComponent implements OnInit {
  @Input() post;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }



}
