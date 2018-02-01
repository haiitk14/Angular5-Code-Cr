import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputRoutingModule } from './input-routing.module';
import { ObjectivesComponent } from './objectives/objectives.component';
import { ProductComponent, CompFilterPipe } from './product/product.component';
import { InitialComponent } from './initial/initial.component';
import { PackingComponent } from './packing/packing.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { LineComponent } from './line/line.component';
import { StudyRequiredGuard } from '../../guards/study-required.guard';
import { LayoutComponent } from './layout/layout.component';
import { jqxGridComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgrid';

import { ModalModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SelectModule } from 'ng-select';
import { SharedModule } from '../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    SelectModule,
    InputRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    NgbModule.forRoot()
  ],
  declarations: [
    ObjectivesComponent, ProductComponent, InitialComponent,
    PackingComponent, EquipmentComponent, LineComponent, LayoutComponent,
    jqxGridComponent, CompFilterPipe
  ],
  providers: [
    StudyRequiredGuard
  ]
})
export class InputModule { }
