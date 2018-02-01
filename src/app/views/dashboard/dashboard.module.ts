import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StartPageComponent } from './start-page/start-page.component';
import { NewStudyComponent } from './new-study/new-study.component';
import { OpenStudyComponent, FilterPipe } from './open-study/open-study.component';

import { SelectModule } from 'ng-select';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ImportComponent } from './import/import.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { Nl2BrPipe } from 'nl2br-pipe';
import { ModalModule } from 'ngx-bootstrap';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SelectModule,
    SharedModule,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
  ],
  declarations: [StartPageComponent, NewStudyComponent, OpenStudyComponent, ImportComponent, FilterPipe, Nl2BrPipe],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class DashboardModule { }
