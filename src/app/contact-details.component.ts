import { Component, Input }               from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location }                       from '@angular/common';

import { Contact }                        from './contact';
import { ContactsService }                from './contacts.service';

@Component({
  templateUrl: './contact-details.component.html',
  styleUrls: [ './contact-details.component.css' ],
  providers: [ ContactsService ]
  
  
})

export class ContactDetailsComponent {

   private id:string;
   
   private selectedContact: Contact; 
   private originalContact: Contact;
   private errorFlag:boolean = false;
   private errorFlags: boolean[] = [false, false, false, false, false];  
   private errorMessage:string;   
   private dataFields:number = 5;
   private addFlag:boolean;
   private modifyFlag:boolean;
  
   
   
   constructor (private route: ActivatedRoute, 
                private router: Router, 
                private location: Location,
                private contactsServer:ContactsService){}
   
   
   ngOnInit() {
     // get contact's id from url
     this.id = this.route.snapshot.params['id'];
     // No Contact Selected (add new contact)
     if (this.id == '0') {
       this.modifyFlag = false; 
       this.addFlag = true;
       this.selectedContact = new (Contact);
     }
     else {
       // get contact to modify and clone it
       this.modifyFlag = true; 
       this.addFlag = false;
       this.selectedContact = this.contactsServer.getContact(+this.id); 
       this.originalContact = Object.assign({}, this.selectedContact);
      } 
   }

  
   
  // if all fields are valid add new contact, unset Active page and gohome 
	addContact(): void{
    this.validateOtherNames();
    this.validateSurName();
    this.validateCompany();
    this.validateEmail();
    this.validatePhone();
    if (!this.errorFlag) {
      this.selectedContact.id = this.getGreatestID();      
      this.contactsServer.addContact(this.selectedContact);
      this.location.back();
    }      
	}


  // validate all fields update contact, unset Active page and gohome 
  updateContact():void {
    this.validateOtherNames();
    this.validateSurName();
    this.validateCompany();
    this.validateEmail();
    this.validatePhone();
    if (!this.errorFlag) {
      this.contactsServer.modifyContact(this.selectedContact);
      this.location.back();
    }
  
  }
  
  goHome():void{
    if (this.errorFlag) {
      this.errorMessage = "Please Fix Error First then proceed";
      return;
    }
    this.location.back();
  }

  resetNew():void{
    // reset form to originalContact's data
    this.selectedContact.otherNames = "";
    this.selectedContact.surName    = "";
    this.selectedContact.company    = "";
    this.selectedContact.email      = "";
    this.selectedContact.phone      = "";
    this.selectedContact.address    = "";
    this.resetErrorFlags();

  }
  
  resetUpdate():void{
    // reset form to originalContact's data
    this.selectedContact.otherNames = this.originalContact.otherNames;
    this.selectedContact.surName = this.originalContact.surName;
    this.selectedContact.company = this.originalContact.company;
    this.selectedContact.email = this.originalContact.email;
    this.selectedContact.phone = this.originalContact.phone;
    this.selectedContact.address = this.originalContact.address;
    this.resetErrorFlags();
  }
  
  
  
  getGreatestID():number{
    let id:number = 1;
    let contacts: Contact[] = this.contactsServer.getContacts(); 
    
    for (let contact of contacts){
      if (contact.id > id) id = contact.id;
    }  
    return (id + 1);  
  }
  
    /* data vaidation starts here */  
   
  // errorFlags [0]  validate first Name
	validateOtherNames(): boolean {
    document.getElementsByName("otherNames")[0].style.border ="1px solid gray";
    let pattern = /^[A-Za-z]+[-\s\']*[A-Za-z]*$/;
    
    let name:string = this.selectedContact.otherNames;
    if (!name) name="X";
    
    
    let pos = name.search(pattern);
	
    if (pos || name.length < 2) {
      document.getElementsByName("otherNames")[0].style.border ="5px double #F00";
      this.errorFlags[0] = true;
      this.errorMessage = "invalid name"; 
      this.updateErrorFlag();
      return (false);
    }
      this.errorFlags[0] = false;
      this.updateErrorFlag();
      return (true);
  }
  
    // errorFlags [1]  validate last Name
  	validateSurName(): boolean {
      
      document.getElementsByName("surName")[0].style.border ="1px solid gray";  
      let pattern = /^[A-Za-z]+[-\s\']*[A-Za-z]*$/;
      let name:string = this.selectedContact.surName;
      
      if (!name) name = "X";
      
      let pos = name.search(pattern);
 
      if (pos || name.length < 2) {
        document.getElementsByName("surName")[0].style.border ="5px double #F00";
        this.errorFlags[1] = true;
        this.errorMessage = "invalid name";
        this.updateErrorFlag();
        return (false);
      }
      this.errorFlags[1] = false;
      this.updateErrorFlag();
      return (true);
  }

  // errorFlags [2] validate company name
	validateCompany(): boolean {
    document.getElementsByName("company")[0].style.border ="1px solid gray"; 
    let pattern = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/;
    let company: string = this.selectedContact.company; 
    if (!company) company = "X";
    
    let pos = company.search(pattern);
	
    if (pos) {
      document.getElementsByName("company")[0].style.border ="5px double #F00";
      this.errorFlags[2] = true;
      this.errorMessage = "invalid Company Name";
      this.updateErrorFlag();
      return (false);
    }
      this.errorFlags[2] = false;
      this.updateErrorFlag();
      return (true);
  }
  
  // errorFlags [3] // validate email address
	validateEmail(): boolean {
    document.getElementsByName("email")[0].style.border ="1px solid gray"; 
    // email pattern from: (http://lawrence.ecorp.net/inet/samples/js/regexp-validate-data.js)
    let pattern = /^([\w]+)(\.[\w]+)*@([\w\-]+)(\.[\w]{2,4})(\.[a-z]{2})?$/i;
    let email:string = this.selectedContact.email;
    if (!email) email = "X";
    
   	if (!pattern.test(email)){
      document.getElementsByName("email")[0].style.border ="5px double #F00";
      this.errorFlags[3] = true;
      this.errorMessage = "invalid email address";
      this.updateErrorFlag();
      return (false);
    }
    this.errorFlags[3] = false;
    this.updateErrorFlag();
    return (true);
  }

  // errorFlags [4] validate phone number
	validatePhone(): boolean {
    document.getElementsByName("phone")[0].style.border ="1px solid gray"; 
		let pattern=/^\(?0\d\)?\s*\d{4}[\- \s]?\d{4}$/;
    let phone:string = this.selectedContact.phone;
    if (!phone) phone = "X";
    
		if (!pattern.test(phone)){
      document.getElementsByName("phone")[0].style.border ="5px double #F00";
      this.errorFlags[4] = true;
      this.errorMessage = "format expected: 09 9999 9999";
      this.updateErrorFlag();
      return (false);
    }
    this.errorFlags[4] = false;
    this.updateErrorFlag();
		return (true);
  }
  
  
  // need to split into street address, suberb, postcode and state to validate properly
  validateAddress(): boolean {
	  return (true);
  }

  /* data validations ends here */

  /* setting and reseting error flags */
  
  // set error flag if any field is invalid
  updateErrorFlag():void{
    this.errorFlag = false;
    for (let i:number = 0; i < this.dataFields; i++){
      if (this.errorFlags[i]) {
        this.errorFlag = true; 
        break;
      }
    }
  }    

  
  // reset errorFlags and fields borders
  resetErrorFlags():void{
    for (let i:number = 0; i < this.dataFields; i++){
      this.errorFlags[i] = false;
    }
    this.errorFlag = false; 
    // reset bordersStyle
    document.getElementsByName("otherNames")[0].style.border ="1px solid gray";
    document.getElementsByName("surName")[0].style.border ="1px solid gray";
    document.getElementsByName("company")[0].style.border ="1px solid gray";
    document.getElementsByName("email")[0].style.border ="1px solid gray";
    document.getElementsByName("phone")[0].style.border ="1px solid gray";
    
  }
  
  // adjust buttons containers  width to form's width 
  adjustWidth(name:string):boolean {
    let width: number = document.getElementById("contactDetails").offsetWidth; 
    document.getElementsByName(name)[0].style.width = width + "px";
    return (true);
   
  }

}
