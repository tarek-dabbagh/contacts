import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { RouterModule, Routes }     from '@angular/router';

import { AppComponent }             from './app.component';
import { ContactDetailsComponent }  from './contact-details.component';
import { HelpPageComponent }        from './help-page.component';
import { BlankPageComponent }       from './blank-page.component';
import { PageNotFoundComponent }    from './page-not-found.component'; 

const contactRoutes: Routes = [
    { path: 'details/:id', component: ContactDetailsComponent },
    { path: 'help',  component: HelpPageComponent },
    { path: '', component: BlankPageComponent },
    { path: '**', component: PageNotFoundComponent }    
];

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  RouterModule.forRoot(contactRoutes)
                ],
  declarations: [ AppComponent, 
                  ContactDetailsComponent,
                  HelpPageComponent,
                  BlankPageComponent,
                  PageNotFoundComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
