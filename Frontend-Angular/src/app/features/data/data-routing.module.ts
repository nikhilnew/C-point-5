import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDataComponent } from './components/view-data/view-data.component';
import { ApplyComponent } from './components/apply/apply.component';
import { MainComponent } from './components/main/main.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';

const routes: Routes = [
  {
    path: '',
   
    component: MainComponent,
    children: [
      { path: 'view', component: ViewDataComponent },
      { path: 'apply', component: ApplyComponent },
      { path: 'edit/:Code', component: EditDataComponent },
      { path: '', redirectTo: '/view', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
