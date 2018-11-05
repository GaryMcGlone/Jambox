import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class SplitPaneCheckerService {
  splitPaneState: boolean;

  constructor(public platform: Platform) {
    this.splitPaneState = false
  }

  setState(state: boolean) {
    if (this.platform.width() > 768) {
      this.splitPaneState = true;
    } else {
      this.splitPaneState = false;
    }
  }

  getSplitPane() {
    return this.splitPaneState;
  }
}
