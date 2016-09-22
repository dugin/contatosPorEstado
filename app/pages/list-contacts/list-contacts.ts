import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Platform, Content, ViewController, PopoverController  } from 'ionic-angular';
import { Contact, NativeStorage } from 'ionic-native';
import {ContactsService} from '../../providers/contacts-service';
import {State} from '../../interface/state-interface';
import {OptionsPage} from '../options/options';
import {DetailsContactsPage} from '../details-contacts/details-contacts';

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
      @ViewChild(Content) content: Content;

  loading: boolean;
  noContact: boolean = false;
  groupedContacts = [];
  alphabet: Promise<string[]>;
  list_index_margin: any;
   itensCount = new Array<number>() ;
 

  constructor(private popoverCtrl: PopoverController, private platform: Platform,  private viewCtrl: ViewController ,private navCtrl: NavController, public contactsService : ContactsService, private navParams: NavParams) {

    this.loading = true;
    
    console.log("ListContactsPage constructor");
     
   
   
    if(navParams.get('city') != null){
    contactsService.arrangeContacts(navParams.get('city')).then( (contactStruct: { [key:string]:Contact[]; }) =>{

          this.groupContacts(contactStruct);
 
    })   
    }

    else {
    NativeStorage.getItem('state').then(
    data => { 

      console.log(data);
      
      contactsService.arrangeContacts(data.property).then( (contactStruct: { [key:string]:Contact[]; }) =>{

          this.groupContacts(contactStruct);
    
    })    },
      
    error =>{ console.error(error)
    }
  );
    }
  }
  
  

  
    gotoList(index){

       let move;
       let x = this.content.getContentDimensions().scrollHeight / this.itensCount[this.itensCount.length-1]

       if(index == 0)
       move = 0;
       else
       move =  this.itensCount[index-1] * x;

          console.log("mova: "+ move);
     
       

        this.content.scrollTo(0, move);

    }

  testIfImgAvailable (contact : Contact) :string{

      /*

      if(contact.photos != null){

        let photo = contact.photos[0].value;

    
     let photo_split=photo.split("%3A");

     console.log(photo_split);
     
       photo="content://media/external/images/media/"+photo_split[1];

    
         return photo;

    
      }
       */

           return  "images/ic_perm_identity_black_48px.svg";

    


  }

  selectContact(contact : Contact) {

   

    this.navCtrl.push(DetailsContactsPage, {
      contact: contact
        });

  }

   groupContacts(contactStruct : { [key:string]:Contact[]; }){

    
     let arr = new Array<string>();

     let totalItens = 0;

      if (Object.keys(contactStruct).length === 0)
        this.noContact = true;

        else
      for (var state in State) {
  
          var isValueProperty = parseInt(state, 10) >= 0

        if (isValueProperty) {
     
  if( contactStruct[State[state]] != null){

      totalItens += contactStruct[State[state]].length +1;
     this.itensCount.push( totalItens ) ; 

    
    
          if(State[state].localeCompare("RESTO") == 0)
        arr.push("##");
        else
         arr.push(State[state]);
    

   let sortedContacts = contactStruct[State[state]].sort((a : Contact,b : Contact) => {
    return  a.name.formatted.localeCompare(b.displayName);
  
}); 

   let newGroup = {
                    letter: this.contactsService.stateShortToFull(State[state]),
                    contacts:sortedContacts  };

                     this.groupedContacts.push(newGroup);
       }
  
            
    };    
         }
          this.dynamicallyChangeCSS(arr);
         this.alphabet = Promise.resolve(arr);
        
         this.loading = false;
       }
   
      
 dynamicallyChangeCSS (indexArray : Array<string>){

     let height =  this.platform.height() / indexArray.length;
     this.list_index_margin = height -10;
     

 }

 presentOptions(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage);
    popover.present({

       ev: myEvent
    });
    
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
