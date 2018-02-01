import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportConfigComponent } from './report-config/report-config.component';
import { LayoutComponent } from './layout/layout.component';

import { TranslateModule } from '@ngx-translate/core';
import { jqxTabsComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtabs';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReportRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ReportConfigComponent,
    LayoutComponent,
  ]
})
export class ReportModule { }
