import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
    template: `
    <ion-list>
      <button ion-item (click)="editProduct()">Edit</button>
      <button ion-item (click)="removeProduct()">Remove</button>
    </ion-list>
  `
})

export class ShowMenuPage {
    private productId;

    constructor(public navParams: NavParams) {
      this.productId = navParams.get('productId');
    }

    editProduct(){

    }

    removeProduct(){

    }
}
