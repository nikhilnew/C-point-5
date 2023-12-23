import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplyComponent } from './components/apply/apply.component';
import { MainComponent } from './components/main/main.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';
// import { ContryComponent } from './components/contry/contry.component';

@NgModule({
  declarations: [
    ViewDataComponent,
    ApplyComponent,
    MainComponent,
    EditDataComponent,
    // ContryComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class DataModule { }
