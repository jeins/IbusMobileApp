import {Component} from '@angular/core';
import {ViewController, NavParams, Platform} from "ionic-angular";

@Component({
    template: `
        <ion-header>
          <ion-toolbar>
            <ion-title>
              Image
            </ion-title>
            <ion-buttons start>
              <button ion-button (click)="dismiss()">
                <span ion-text color="primary" showWhen="ios">Cancel</span>
                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
              </button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        
        <ion-content>
            <ion-item>
                <img src="{{image}}">
            </ion-item>
        </ion-content>
    `
})

export class OrderProductImageModalPage {
    image: string;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController) {
        console.log(params.get('image'))
        this.image = params.get('image');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}