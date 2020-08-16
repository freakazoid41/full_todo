import { Injectable } from '@angular/core';
declare const Plib:any;
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  plib:any;
  
  constructor() {
    this.plib = new Plib();
  }

  async getDateTodo(date){
    return this.plib.request({
      url:'custom/todo',
      method:'POST',
      data:{
        target:date
      }
    });
  }

  async addTodoItem(title){
    return this.plib.request({
      url:'request/todo',
      method:'POST',
      data:{
        title:title
      }
    });
  }

  async updateTodoItem(id,status){
    return this.plib.request({
      url:'request/todo/'+id,
      method:'PATCH',
      data:{
        status:Number(status)
      }
    });
  }

  async deleteTodoItem(id){
    return this.plib.request({
      url:'request/todo/'+id,
      method:'DELETE',
      data:{
        status:status
      }
    });
  }
}
