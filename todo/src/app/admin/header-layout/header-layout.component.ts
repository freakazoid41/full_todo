import { Component, OnInit } from '@angular/core';
declare const Plib:any;


@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {
  plib :any;
  constructor() {
    this.plib = new Plib();
  }

  ngOnInit(): void {
  }

  logout(){
    this.plib.login(false);
  }

}
