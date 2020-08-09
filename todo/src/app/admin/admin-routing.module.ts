import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';

import {MainLayoutComponent} from './main-layout/main-layout.component';

const routes: Routes = [
    { 
        path: 'admin',
        component: MainLayoutComponent,
        children:[
            {
                path:'',
                component:DashboardComponent
            },
            {
                path:'history',
                component:HistoryComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
