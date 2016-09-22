import { Injectable } from '@angular/core';
import { Contacts, Contact } from 'ionic-native';
import {CityToState} from '../util/city-to-state-util';

declare var google: any;

@Injectable()
export class ContactsService {

    c : CityToState;

     constructor() {

        this.c = new CityToState();
        
    }

   

    arrangeContacts (estado: string) : Promise<{ [key:string]:Contact[]; }>{

       let est = estado.substring(estado.length-3).replace(/ /g,'');;

       let promise: Promise<{ [key:string]:Contact[]; }> = new Promise((resolve, reject) =>{

         Contacts.find(['*']).then((contacts :Contact[]) => {

              this.c.rearrangeTelephoneNumbers(contacts, est);

              resolve(CityToState.contactsStruct);

     

 })
        
         
      })
        return promise;
    }

       stateShortToFull (state: string){
          return this.c.stateShortToFull(state);
      }
  

}
