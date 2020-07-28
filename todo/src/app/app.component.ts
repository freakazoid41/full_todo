import { Component } from '@angular/core';
declare const Plib:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plib :any;
  title = 'todo';
  constructor() {
    this.plib = new Plib();
    if(this.plib.getClient()==='null' && window.location.pathname !== '/login')this.plib.login(false);
  }
  ngOnInit(): void {
  }
}
