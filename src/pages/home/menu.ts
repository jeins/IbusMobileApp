import {Component} from "@angular/core";
import {OrderListPage} from "../order/list/list";

@Component({
    template: `
    <ion-list>
      <button ion-item>Profile Company</button>
      <button ion-item>Histories</button>
      <button ion-item [navPush]="orderListPage">Selling</button>
      <button ion-item>Settings</button>
    </ion-list>
  `
})

export class HomeMenuPage {

    orderListPage = OrderListPage;

    constructor() {
    }
}