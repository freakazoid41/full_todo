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
  plib:any;

  constructor() {
    //set warnings
    this.warn = {
      username:false,
      password:false
    } 

    this.plib = new plib();
  }

  ngOnInit(): void {
    
  }

  login() { 
    let valid = true;
    for(let key in this.warn){
      if(this[key] === undefined || this[key] === ''){
        valid = false;
        this.warn[key] = true;
      }
    }
    if(valid){
      const obj = {
        username:this.username,
        password:this.password
      };
      console.log(obj);
      //login request
      const rsp = this.plib.request({
        url:'login',
        method:'POST',
        data:obj
      });
      console.log(rsp);
    }


    console.log(this.username);
  }


}
