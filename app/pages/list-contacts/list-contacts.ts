import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contact } from 'ionic-native';
import {ContactsService} from '../../services/contacts-service';
import {State} from '../../interface/state-interface'


/*
  Generated class for the ListContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/list-contacts/list-contacts.html',
  providers: [ContactsService]
})
export class ListContactsPage {

 
  groupedContacts = [];


  constructor(private navCtrl: NavController, public contactsService : ContactsService, private navParams: NavParams) {
   
    contactsService.arrangeContacts(navParams.get('city')).then( (contactStruct: { [key:string]:Contact[]; }) =>{

          this.groupContacts(contactStruct);
 
    })    
      
  }

   groupContacts(contactStruct : { [key:string]:Contact[]; }){

      

      for (var state in State) {
  
          var isValueProperty = parseInt(state, 10) >= 0

        if (isValueProperty) {
     
  if( contactStruct[State[state]] != null){
    
    

   let sortedContacts = contactStruct[State[state]].sort(function(a : Contact,b : Contact) {
 
    return a.displayName.localeCompare(b.displayName);
  
}); 



   let newGroup = {
                    letter: this.contactsService.stateShortToFull(State[state]),
                    contacts:sortedContacts  };

                     this.groupedContacts.push(newGroup);
       }
  
            
    };    
         }
       }
   
      

  
  
  savefn() {
     // this.navCtrl.push(AddcontactPage);
  }
  
  findfn(val) {  /* 
      Contacts.find(['*'], {filter: val}).then((contacts) => {
          this.contactsfound = contacts;
         console.log(contacts[25]);
         
      })
      
      if(this.contactsfound.length == 0)
      this.contactsfound.push({displayName: 'No Contacts found'});  
      this.search = true;     */
  }

}
