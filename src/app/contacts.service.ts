import { Injectable }     from '@angular/core';
import { Contact } 		    from './contact';
import { ContactsData }	  from './contactsData';

@Injectable()
export class ContactsService {
	private contacts = ContactsData;
	
  
	public getContacts():Contact[] {
    this.sortContacts();
		return this.contacts;
	}
  
  public getContact(id: number):Contact{
    return this.contacts.find(contact => contact.id === id);
  }


  public addContact(contact: Contact): void{
     this.contacts.push(contact);
     this.sortContacts();
  }
  
  public modifyContact(modifiedContact: Contact):void{
    let contactToModify = this.contacts.find(contact => contact.id === modifiedContact.id);
    contactToModify.otherNames = modifiedContact.otherNames;
    contactToModify.surName    = modifiedContact.surName;
    contactToModify.company    = modifiedContact.company;
    contactToModify.email      = modifiedContact.email;
    contactToModify.phone      = modifiedContact.phone;
    contactToModify.address    = modifiedContact.address;
    
  }
  
  public deleteContact(contact:Contact):Contact[]{
    // filter out selected contact
		this.contacts = this.contacts.filter(c => c !== contact);
    contact = null;
    return (this.contacts);

  }
  
  private sortContacts():void {
     // sort contacts by name
    this.contacts = this.contacts.sort(function(a, b) {
      let nameA:string  = a.otherNames.toLowerCase() + " " + a.surName.toLowerCase(); 
      let nameB:string  = b.otherNames.toLowerCase() + " " + b.surName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;});
    }
}