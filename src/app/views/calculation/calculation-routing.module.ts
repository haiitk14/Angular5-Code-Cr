import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CheckControlComponent } from './check-control/check-control.component';
import { CalculationStatusComponent } from './calculation-status/calculation-status.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'check-control',
        pathMatch: 'full',
      },
      {
        path: 'check-control',
        component: CheckControlComponent
      },
      {
        path: 'calculation-status',
        component: CalculationStatusComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationRoutingModule { }
