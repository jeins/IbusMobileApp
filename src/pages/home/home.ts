import { Component } from '@angular/core';
import {PopoverController, NavController} from 'ionic-angular';

import { InputPage } from '../input/input';
import { HistoryPage } from '../history/history';
import { MenuPopOverPage } from "./menuPopOver";
import {ShowPage} from "../show/show";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputPage = InputPage;
  historyPage = HistoryPage;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  }

  displayMenu(myEvent){
    let popover = this.popoverCtrl.create(MenuPopOverPage);
    popover.present({
      ev: myEvent
    });
  }

  showProduct(productId: string){
    this.navCtrl.push(ShowPage, {productId})
  }
}
