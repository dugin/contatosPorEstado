import { Injectable } from '@angular/core';
import { Contacts, Contact } from 'ionic-native';
import {CityToStateUtil} from '../util/city-to-state-util';

declare var google: any;

@Injectable()
export class ContactsService {

  

     constructor() {

     
        
    }

   

    arrangeContacts (estado: string) : Promise<{ [key:string]:Contact[]; }>{

       let est = estado.substring(estado.length-3).replace(/ /g,'');;

       let promise: Promise<{ [key:string]:Contact[]; }> = new Promise((resolve, reject) =>{

         Contacts.find(['*']).then((contacts :Contact[]) => {

              CityToStateUtil.rearrangeTelephoneNumbers(contacts, est);

              resolve(CityToStateUtil.contactsStruct);

     

 })
        
         
      })
        return promise;
    }

       stateShortToFull (state: string){
          return CityToStateUtil.stateShortToFull(state);
      }
  

}
