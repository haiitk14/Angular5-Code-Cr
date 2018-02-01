import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent, UserFilterPipe, ConnectionsFilterPipe } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { TranslationsComponent } from './translations/translations.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Nl2BrPipe } from 'nl2br-pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    SharedModule,
    TranslateModule.forChild(),
    PerfectScrollbarModule,
    FormsModule
  ],
  declarations: [UsersComponent, UnitsComponent, TranslationsComponent, UserFilterPipe, ConnectionsFilterPipe]
})
export class AdminModule { }
