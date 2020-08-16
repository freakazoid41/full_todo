import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
//layout parts
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
//
//pages
import { HistoryComponent } from './history/history.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
//
//page parts
import { TodoDashComponent } from './todo-dash/todo-dash.component';
import { CalendarDashComponent } from './calendar-dash/calendar-dash.component'; // a plugin
///


import { AdminRoutingModule}  from './admin-routing.module';

//metarial app
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatListModule} from '@angular/material/list'; 
import {MatInputModule} from '@angular/material/input'; 
//
//full calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid';
//

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

@NgModule({
  imports:[
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    FullCalendarModule
  ],
  exports:[
    MainLayoutComponent
  ],
  declarations:[
    MainLayoutComponent,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    DashboardComponent,
    HistoryComponent,
    TodoDashComponent,
    CalendarDashComponent
  ]

})
export class AdminModule {}

