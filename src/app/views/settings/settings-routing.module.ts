import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MeshComponent } from './mesh/mesh.component';
import { CalculationComponent } from './calculation/calculation.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'mesh',
        pathMatch: 'full',
      },
      {
        path: 'mesh',
        component: MeshComponent,
      },
      {
        path: 'calculation',
        component: CalculationComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
