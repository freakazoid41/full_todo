import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
//import plib
declare const Plib:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  warn:object;
  plib :any;

  constructor(private _snackBar: MatSnackBar) {
    //set warnings
    this.warn = {
      username:false,
      password:false
    } 
    this.plib = new Plib();
  }

  ngOnInit(): void {
    
  }

  async login() { 
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
      
      //login request
      const rsp = await this.plib.request({
        url:'login',
        method:'POST',
        data:obj
      });
      if(rsp.rsp){
        this.plib.login(true,rsp.data);
      }else{
        this._snackBar.open(rsp.msg, null, {
          duration: 2000,
          horizontalPosition:'end',
          verticalPosition:'top'
        });
      }
    }
  }


}
