import {Component} from "@angular/core";

@Component({
    template: `
    <ion-list>
      <button ion-item>Profile Company</button>
      <button ion-item>Histories</button>
      <button ion-item>Selling</button>
      <button ion-item>Settings</button>
    </ion-list>
  `
})

export class MenuPopOverPage {
    constructor() {
    }
}