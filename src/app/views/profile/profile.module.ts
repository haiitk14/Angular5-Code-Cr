import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UserreferencesComponent } from './userreferences/userreferences.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    PerfectScrollbarModule,
    ModalModule.forRoot(),
  ],
  declarations: [LayoutComponent, UserreferencesComponent]
})
export class ProfileModule { }
