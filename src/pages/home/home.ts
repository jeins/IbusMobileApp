import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { InputPage } from '../input/input';
import { HistoryPage } from '../history/history';
import {MenuPopOverPage} from "./menuPopOver";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputPage = InputPage;
  historyPage = HistoryPage;

  constructor(public popoverCtrl: PopoverController) {

  }

  displayMenu(myEvent){
    let popover = this.popoverCtrl.create(MenuPopOverPage);
    popover.present({
      ev: myEvent
    });
  }

}
