import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PreliminaryComponent } from './preliminary/preliminary.component';
import { SizingComponent } from './sizing/sizing.component';
import { OutputChartsComponent } from './output-charts/output-charts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'preliminary',
        pathMatch: 'full',
      },
      {
        path: 'preliminary',
        component: PreliminaryComponent
      },
      {
        path: 'sizing',
        component: SizingComponent
      },
      {
        path: 'charts',
        component: OutputChartsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule { }
