import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';

import {AdminRoutingModule} from './admin-routing.module';

//metarial app
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
//


@NgModule({
  imports:[
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    MainLayoutComponent
  ],
  declarations:[
    MainLayoutComponent,
    FooterLayoutComponent,
    HeaderLayoutComponent
  ]

})
export class AdminModule {}

