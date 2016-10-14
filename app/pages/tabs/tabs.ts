import {Component} from '@angular/core';
import {ListContactsPage} from '../list-contacts/list-contacts';
import {LastContactsPage} from '../last-contacts/last-contacts';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;


  constructor(nav : NavController) {
    
    
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ListContactsPage;
    this.tab2Root = LastContactsPage;
    
  }
}
