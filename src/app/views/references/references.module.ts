import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReferencesRoutingModule } from './references-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ComponentComponent, ComponentFilterPipe } from './component/component.component';
import { PackingComponent, PackingElmtFilterPipe } from './packing/packing.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PipelineComponent, PipeLineFilterPipe } from './pipeline/pipeline.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    ReferencesRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    SharedModule,
    TranslateModule.forChild(),
    PerfectScrollbarModule
  ],
  declarations: [LayoutComponent, ComponentComponent, PackingComponent, EquipmentComponent,
    PipelineComponent, PackingElmtFilterPipe, PipeLineFilterPipe, ComponentFilterPipe]
})
export class ReferencesModule { }
