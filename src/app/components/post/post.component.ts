import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from "../../interfaces/user-interface";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() searchResult: Post;
  private btnValue = "follow";
  private buttonFill = "outline";
  private username: string;
  errorMessage: string;
  user: IUser[];

  constructor(private databaseService: DatabaseService, public auth: FirebaseAuthService) {}

  ngOnInit() {}
  follow() {
    if (this.buttonFill == "outline") {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
    } else {
      this.btnValue = "follow";
      this.buttonFill = "outline";
    }
  }
}
