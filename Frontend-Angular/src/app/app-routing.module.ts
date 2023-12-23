import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDataComponent } from './features/data/components/view-data/view-data.component';
const routes: Routes = [
  {path:'view',component:ViewDataComponent},

  {
    path: '',
    loadChildren: () => import('./features/data/data.module').then((m) => m.DataModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
