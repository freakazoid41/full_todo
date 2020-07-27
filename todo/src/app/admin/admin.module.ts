import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterLayoutComponent } from './footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';

import {AdminRoutingModule} from './admin-routing.module';



@NgModule({
  imports:[
    CommonModule,
    AdminRoutingModule
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

