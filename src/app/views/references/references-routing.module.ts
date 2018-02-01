import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ComponentComponent } from './component/component.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PackingComponent } from './packing/packing.component';
import { PipelineComponent } from './pipeline/pipeline.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'component',
        pathMatch: 'full',
      },
      {
        path: 'component',
        component: ComponentComponent
      },
      {
        path: 'packing',
        component: PackingComponent
      },
      {
        path: 'equipment',
        component: EquipmentComponent
      },{
        path: 'pipeline',
        component: PipelineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferencesRoutingModule { }
