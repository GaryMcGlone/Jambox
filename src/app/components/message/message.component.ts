import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message

  constructor() { }

  ngOnInit() {
  }

}
