import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';

import {AdminRoutingModule} from './admin-routing.module';

//metarial app
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'; 
import {MatListModule} from '@angular/material/list'; 
import {MatInputModule} from '@angular/material/input'; 
import { HistoryComponent } from './history/history.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
//


@NgModule({
  imports:[
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule
  ],
  exports:[
    MainLayoutComponent
  ],
  declarations:[
    MainLayoutComponent,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    DashboardComponent,
    HistoryComponent
  ]

})
export class AdminModule {}

