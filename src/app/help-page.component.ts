import { Component }            from '@angular/core';
import { Router }               from '@angular/router';

@Component({
  templateUrl: './help-page.component.html',
  styleUrls:   ['./help-page.component.css']

})

export class HelpPageComponent  {
  constructor(private router: Router){}
  
  
  goHome() : void {
    this.router.navigate(['/']);
	}
  
   // adjust navButtons width to help table's width 
  adjustWidth():boolean {
    let width: number = document.getElementsByName("help")[0].offsetWidth;
    document.getElementsByName("navButtons")[0].style.width = width + "px";
    return (true);
  }
}