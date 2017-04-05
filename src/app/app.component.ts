import { Component, OnInit }  from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


import { ContactsService }    from './contacts.service';
import { Contact } 		        from './contact';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ ContactsService ]
})

export class AppComponent implements OnInit {
  private contacts:Contact[];
  private selectedContact: Contact;
  private deleteFlag:boolean = false;
  private textToSearch:string;
  private displayIsOn: boolean;



  
  constructor(private router: Router, 
              private contactsServer: ContactsService){
                  //router events from http://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular-2/38080657#38080657 
                  router.events.forEach((event) => {
                  if(event instanceof NavigationStart) {
                    // if routed to home page set display to on
                    this.displayIsOn = false;                     
                    if (event.url == "/") {
                      this.displayIsOn = true;
                    }
                  }
                  // NavigationEnd
                  // NavigationCancel
                  // NavigationError
                  // RoutesRecognized
                });
                }
                
              
   
  ngOnInit() : void {
    this.contacts   = this.contactsServer.getContacts();
  }
  
  
 
  // goto help page
  gotoHelp():void {
    this.router.navigate(['/help']);
  }
   
  
  // goto contact's details page
  gotoDetails(id:number): void {
    this.router.navigate(['/details', id ]);
  }
 

  // edit / view contact
  onSelect(contact: Contact): void {
    //  set selected contact      
    this.selectedContact = contact;
  }

 
  
	deleteConfirmation(contact: Contact): void {
    // select contact to be deleted
	  this.selectedContact = contact;
    // set delete flag
	  this.deleteFlag = true; 
	}
  
 
	deleteContact(contact: Contact): void {
    // reset delete flag
		this.deleteFlag = false;  
    
    this.contacts = this.contactsServer.deleteContact(contact);
		if (this.selectedContact === contact) { 
      // unset selected contact         
      this.selectedContact = null;   
    }
	}
 

  // cancel the delete operation
  cancelDelete(): void {
	  this.deleteFlag = false;
  }
  
  // adjust navButtons width to contactList width 
  adjustWidth():boolean {
    let width: number = document.getElementsByName("contactList")[0].offsetWidth;
    document.getElementsByName("navButtons")[0].style.width = width + "px";
    return (true);
  }

  searchContacts(): void {
    // if search box is empty display all contacts else filter contacts     
    if (!this.textToSearch){
      this.contacts = this.contactsServer.getContacts();
    }
    else this.contacts = filterNames(this.textToSearch, this.contacts);
  }
}


// return contacts whoes surName or otherNames match
function filterNames(query:string, contacts:Contact[]) {
     return contacts.filter(function(contact:Contact) {
     return ((contact.otherNames.toLowerCase().indexOf(query.toLowerCase()) > -1)||
             (contact.surName.toLowerCase().indexOf(query.toLowerCase()) > -1));  
    })
}


