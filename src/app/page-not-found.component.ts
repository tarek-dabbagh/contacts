import { Component }            from '@angular/core';
import { Router }               from '@angular/router';


@Component({
  template: `
             <p>Page Not Found</p>
             <div class="router">
             <input type="button" class="nav-button" (click)="goHome()"    value="Go Home"/>
             </div>
            `,
   styles:    [`
             .nav-button {
                float: right;
                font-size: 12px;
                width: 12em;
                background-color: #369;
                border: none;
                color: white;
                padding: 1em 2em;
                border-radius: 1em;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 12px;
                margin: 4px 2px;
                cursor: pointer;
              }

            .router{
              font-size: 12px;
              width: 27em;
            }

            ` ]
      
            

})

export class PageNotFoundComponent  {
  
  constructor(private router: Router){}
  
  goHome() : void {
    this.router.navigate(['/']);
	}
}