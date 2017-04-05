"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var contacts_service_1 = require('./contacts.service');
var AppComponent = (function () {
    function AppComponent(router, contactsServer) {
        var _this = this;
        this.router = router;
        this.contactsServer = contactsServer;
        this.deleteFlag = false;
        //router events from http://stackoverflow.com/questions/33520043/how-to-detect-a-route-change-in-angular-2/38080657#38080657 
        router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationStart) {
                // if routed to home page set display to on
                _this.displayIsOn = false;
                if (event.url == "/") {
                    _this.displayIsOn = true;
                }
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.contacts = this.contactsServer.getContacts();
    };
    // goto help page
    AppComponent.prototype.gotoHelp = function () {
        this.router.navigate(['/help']);
    };
    // goto contact's details page
    AppComponent.prototype.gotoDetails = function (id) {
        this.router.navigate(['/details', id]);
    };
    // edit / view contact
    AppComponent.prototype.onSelect = function (contact) {
        //  set selected contact      
        this.selectedContact = contact;
    };
    AppComponent.prototype.deleteConfirmation = function (contact) {
        // select contact to be deleted
        this.selectedContact = contact;
        // set delete flag
        this.deleteFlag = true;
    };
    AppComponent.prototype.deleteContact = function (contact) {
        // reset delete flag
        this.deleteFlag = false;
        // filter out selected contact
        this.contacts = this.contacts.filter(function (c) { return c !== contact; });
        if (this.selectedContact === contact) {
            // unset selected contact         
            this.selectedContact = null;
        }
    };
    // cancel the delete operation
    AppComponent.prototype.cancelDelete = function () {
        this.deleteFlag = false;
    };
    // adjust navButtons width to contactList width 
    AppComponent.prototype.adjustWidth = function () {
        var width = document.getElementsByName("contactList")[0].offsetWidth;
        document.getElementsByName("navButtons")[0].style.width = width + "px";
        return (true);
    };
    AppComponent.prototype.searchContacts = function () {
        // if search box is empty display all contacts else filter contacts     
        if (!this.textToSearch) {
            this.contacts = this.contactsServer.getContacts();
        }
        else
            this.contacts = filterNames(this.textToSearch, this.contacts);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './html/app.component.html',
            styleUrls: ['./css/app.component.css'],
            providers: [contacts_service_1.ContactsService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, contacts_service_1.ContactsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// return contacts whoes surName or otherNames match
function filterNames(query, contacts) {
    return contacts.filter(function (contact) {
        return ((contact.otherNames.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
            (contact.surName.toLowerCase().indexOf(query.toLowerCase()) > -1));
    });
}
//# sourceMappingURL=app.component.js.map