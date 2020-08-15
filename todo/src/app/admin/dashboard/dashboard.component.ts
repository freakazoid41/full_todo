import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import * as dayjs from 'dayjs';

declare const Plib:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //item list
  titems: object[] = [/*{
    id:1,
    title:'Falan',
    selected:true
  },{
    id:2,
    title:'Falan 1',
    selected:false
  }*/];

  plib :any;

  //new item input
  nitem:string;
  warn:object = {
    nitem:false
  };


  constructor(private request:RequestService) { 
    this.plib = new Plib();

    //call todays todo items
    const rsp = request.getDateTodo(dayjs().format('YYYY-MM-DD')).then(rsp=>{
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

  itemEvent(index,status){
    /*console.log(event.option._element.nativeElement.id)
    console.log(event.option.selected)*/
    console.log(status)
    console.log(index)

    //change status of element
    this.titems[index]['selected'] = status;
    console.log(this.titems[index])
  }

  addItem(){
    if(this.nitem === undefined || this.nitem.trim() === ''){
      this.warn['nitem'] = true;
    }else{
      this.warn['nitem'] = false;
      //add item

      this.titems.push({
        id:(new Date()).getTime(),
        title:this.nitem,
        selected:false
      });
      this.nitem = '';
    }
    console.log(this.nitem)
  }
  
}
