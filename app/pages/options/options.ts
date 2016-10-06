import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {LocationPage} from '../location/location';


/*
  Generated class for the OptionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/options/options.html',
})
export class OptionsPage {

  constructor(private navCtrl: NavController, private viewCtrl: ViewController) {

  }

  changeState(){

  
    


this.navCtrl.push(LocationPage);


 

  }

  ionViewDidLeave(){

    this.navCtrl.remove(0);
  }

}
