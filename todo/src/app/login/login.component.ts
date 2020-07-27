import { Component, OnInit } from '@angular/core';
//import plib
import { plib } from '../../lib/plib';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  warn:object;
  constructor() {
    //set warnings
    this.warn = {
      username:false,
      password:false
    } 

    new plib();
  }

  ngOnInit(): void {
  }

  login() { 
    for(let key in this.warn){
      this.warn[key] = this[key] === undefined || this[key] === '';
    }



    console.log(this.username);
  }


}
