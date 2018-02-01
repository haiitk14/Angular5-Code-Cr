import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutComponent } from './layout/layout.component';

import { MeshComponent } from './mesh/mesh.component';
import { CalculationComponent } from './calculation/calculation.component';
import { ResultComponent } from './result/result.component';


import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    FormsModule

  ],
  declarations: [LayoutComponent, MeshComponent, CalculationComponent, ResultComponent]
})
export class SettingsModule { }
