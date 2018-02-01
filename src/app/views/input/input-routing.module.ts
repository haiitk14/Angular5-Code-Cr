import { ProductComponent } from './product/product.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialComponent } from './initial/initial.component';
import { PackingComponent } from './packing/packing.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LineComponent } from './line/line.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'objectives',
        pathMatch: 'full',
      },
      {
        path: 'objectives',
        component: ObjectivesComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'initial',
        component: InitialComponent
      },
      {
        path: 'packing',
        component: PackingComponent
      },
      {
        path: 'equipment',
        component: EquipmentComponent
      },
      {
        path: 'line',
        component: LineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputRoutingModule { }
