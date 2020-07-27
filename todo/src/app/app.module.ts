import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { FooterLayoutComponent } from './layout/footer-layout/footer-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
