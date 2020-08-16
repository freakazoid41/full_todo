import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
@Component({
  selector: 'app-calendar-dash',
  templateUrl: './calendar-dash.component.html',
  styleUrls: ['./calendar-dash.component.css']
})
export class CalendarDashComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
