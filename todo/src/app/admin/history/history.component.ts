import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  //tabulator table
  table = null;

  constructor() { }

  ngOnInit(): void {
    this.drawTable();
  }


  private drawTable(): void {
    this.table = new Tabulator("#table_todo", {
      /*ajaxURL: 'falanboyle.gibigeresiz',
      ajaxSorting: true,
      ajaxFiltering: true,
      pagination: "remote",*/
      reactiveData: true, //turn on data reactivity
      placeholder: "Veri Yok",
      paginationSize: 50,
      height: "500px",
      layout: "fitColumns",
      resizableRows: false,
      resizableColumns: false,
      rowClick: (e, row) => {
         
      },
      columns: [
          { title: "Job", field: "code", sorter: "string", width: "100", cssClass: "c" },
          { title: "Status", field: "name", sorter: "string" },
          { title: "End Date", field: "name", sorter: "string" }
      ],
    });
  }
}
