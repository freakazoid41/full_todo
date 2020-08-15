import { Injectable } from '@angular/core';
declare const Plib:any;
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  plib:any;
  
  constructor() {
    this.plib = new Plib();
  }

  async getDateTodo(date){
    const rsp = this.plib.request({
      url:'custom/todo',
      method:'POST',
      data:{
        target:date
      }
    });
    return rsp;
  }
}
