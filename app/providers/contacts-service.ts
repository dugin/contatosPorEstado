import { Injectable } from '@angular/core';
import { Contacts, Contact } from 'ionic-native';
import {CityToStateUtil} from '../util/city-to-state-util';

declare var google: any;

@Injectable()
export class ContactsService {

  private  static  lstFiveCts : Promise<Contact[]>;

     constructor() {

     
        
    }

   

    arrangeContacts (estado: string) : Promise<{ [key:string]:Contact[]; }>{

       let est = estado.substring(estado.length-3).replace(/ /g,'');;

       let promise: Promise<{ [key:string]:Contact[]; }> = new Promise((resolve, reject) =>{

         Contacts.find(['*']).then((contacts :Contact[]) => {

            
             

              ContactsService.lstFiveCts =  Promise.resolve(this.setLastFiveContacts(contacts));

         

              CityToStateUtil.rearrangeTelephoneNumbers(contacts, est);

              resolve(CityToStateUtil.contactsStruct);

     

 })
        
         
      })
        return promise;
    }

    private setLastFiveContacts (contacts :Contact[]) : Contact[]{
        

      return contacts.slice(contacts.length-5).reverse();


    }
    getlastFiveContacts () : Promise<Contact[]> {

        return ContactsService.lstFiveCts;

    }

       stateShortToFull (state: string){
          return CityToStateUtil.stateShortToFull(state);
      }
  

}
