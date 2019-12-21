import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shreya-project';
  alertMessage; 

  ngOnInit(){
    
    this.alertMessage = {
      type : 'warning',
      message: 'Your friend wants to track you.'
    } 
    /*
    setTimeout(() => {
      this.alertMessage = {
        type : 'info',
        message: 'Changed aaaa.'
      }; 
    }, 2000);
    */
  }

}
