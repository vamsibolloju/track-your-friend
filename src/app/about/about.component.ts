import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public sections: Array<string> = ['Application', 'Technologies used', 'Hosting', 'References']
  public selectedSection: string = this.sections[0];
  constructor() { }

  ngOnInit() {
  }

  onSectionSelection(event: Event, section: string){
    event.preventDefault();
    this.selectedSection = section;
  }

}
