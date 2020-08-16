import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TodoService } from '../todo.service';
import * as dayjs from 'dayjs';

declare const Plib:any;


@Component({
  selector: 'app-todo-dash',
  templateUrl: './todo-dash.component.html',
  styleUrls: ['./todo-dash.component.css']
})
export class TodoDashComponent implements OnInit {
  //item list
  titems : object[] = [];

  plib :any;

  //new item input
  nitem:string;
  warn:object = {
    nitem:false
  };


  constructor(private todo:TodoService,private _snackBar: MatSnackBar) { 
    this.plib = new Plib();

    //call todays todo items
    const rsp = todo.getDateTodo(dayjs().format('YYYY-MM-DD')).then(rsp=>{
      if(rsp.count>0){
        for(let i=0;i<rsp.count;i++){
          this.titems.push({
            id:rsp.data[i].id,
            title:rsp.data[i].title,
            selected:Boolean(rsp.data[i].status)
          })
        }
      }
      console.log(rsp)
    });
    

  }

  ngOnInit(): void {
  }

  async itemEvent(event,index,status){
    if(event === 'update'){
      //change status of element
      this.titems[index]['selected'] = status;
      //send item to api
      this.todo.updateTodoItem(this.titems[index]['id'],status);
    }else{
      this.todo.deleteTodoItem(this.titems[index]['id']);
      this.titems.splice(index, 1);
    }
   
  }

  async addItem(){
    if(this.nitem === undefined || this.nitem.trim() === ''){
      this.warn['nitem'] = true;
    }else{
      this.warn['nitem'] = false;
      
      //send item to api 
      const rsp = await this.todo.addTodoItem(this.nitem);
      if(rsp.rsp === true){
        //add item
        this.titems.push({
          id:rsp.data,
          title:this.nitem,
          selected:false
        });
      }else{
        this._snackBar.open('Hata Oluştu..', null, {
          duration: 2000,
          horizontalPosition:'end',
          verticalPosition:'top'
        });
      }
      this.nitem = '';
    }
  }
  
}