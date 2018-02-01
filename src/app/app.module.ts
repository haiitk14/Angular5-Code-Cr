import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from './authentication/authentication-interceptor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';
import { MembersLayoutComponent } from './layouts/members-layout/members-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { NoStudyGuard } from './guards/no-study.guard';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { SharedModule } from './shared/shared.module';

import { SelectModule } from 'ng-select';
import { ProfileModule } from './views/profile/profile.module';
import { ReferencesModule } from './views/references/references.module';
import { SettingsModule } from './views/settings/settings.module';
import { AdminModule } from './views/admin/admin.module';
import { ProfileLayoutComponent } from './layouts/profile-layout/profile-layout.component';

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

// Import 3rd party components
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { StudyRequiredGuard } from './guards/study-required.guard';
import { StatusService } from './shared/status.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AppSysUtilzComponent } from './components/app-sys-utilz/app-sys-utilz.component';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import { jqxBulletChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbulletchart';
import { jqxButtonGroupComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbuttongroup';
import { jqxButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbuttons';
import { jqxCalendarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcalendar';
import { jqxChartComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxchart';
import { jqxCheckBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcheckbox';
import { jqxColorPickerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcolorpicker';
import { jqxComboBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcombobox';
import { jqxComplexInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxcomplexinput';
import { jqxDataTableComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxDockingComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdocking';
import { jqxDockingLayoutComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdockinglayout';
import { jqxDockPanelComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdockpanel';
import { jqxDragDropComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdragdrop';
import { jqxDrawComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdraw';
import { jqxDropDownButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxEditorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxeditor';
import { jqxExpanderComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxexpander';
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';
import { jqxFormattedInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxformattedinput';
import { jqxGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgauge';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxKanbanComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxkanban';
import { jqxKnobComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxknob';
import { jqxLayoutComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlayout';
import { jqxLinearGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlineargauge';
import { jqxLinkButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlinkbutton';
import { jqxListBoxComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox';
import { jqxListMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxlistmenu';
import { jqxLoaderComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxloader';
import { jqxMaskedInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmaskedinput';
import { jqxMenuComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';
import { jqxNavBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxnavbar';
import { jqxNavigationBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxnavigationbar';
import { jqxNotificationComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxnotification';
import { jqxNumberInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxnumberinput';
import { jqxPanelComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpanel';
import { jqxPasswordInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpasswordinput';
import { jqxPivotDesignerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpivotdesigner';
import { jqxPivotGridComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpivotgrid';
import { jqxPopoverComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpopover';
import { jqxProgressBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxprogressbar';
import { jqxRadioButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxradiobutton';
import { jqxRangeSelectorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxrangeselector';
import { jqxRatingComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxrating';
import { jqxRepeatButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxrepeatbutton';
import { jqxResponsivePanelComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxresponsivepanel';
import { jqxRibbonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxribbon';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';
import { jqxScrollBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscrollbar';
import { jqxScrollViewComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscrollview';
import { jqxSliderComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxslider';
import { jqxSortableComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxsortable';
import { jqxSplitterComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxsplitter';
import { jqxSwitchButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxswitchbutton';
import { jqxTabsComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtabs';
import { jqxTagCloudComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtagcloud';
import { jqxTextAreaComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtextarea';
import { jqxToggleButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtogglebutton';
import { jqxToolBarComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtoolbar';
import { jqxTooltipComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtooltip';
import { jqxTreeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtree';
import { jqxTreeGridComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtreegrid';
import { jqxTreeMapComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxtreemap';
import { jqxValidatorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxvalidator';
import { jqxWindowComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxwindow';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationModule } from './authentication/authentication.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    jqxBarGaugeComponent,
    MembersLayoutComponent,
    AuthLayoutComponent,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    DashboardLayoutComponent,
    AppSysUtilzComponent,
    jqxBulletChartComponent,
    jqxButtonGroupComponent,
    jqxButtonComponent,
    jqxCalendarComponent,
    jqxChartComponent,
    jqxCheckBoxComponent,
    jqxColorPickerComponent,
    jqxComboBoxComponent,
    jqxComplexInputComponent,
    jqxDataTableComponent,
    jqxDateTimeInputComponent,
    jqxDockingComponent,
    jqxDockingLayoutComponent,
    jqxDockPanelComponent,
    jqxDragDropComponent,
    jqxDrawComponent,
    jqxDropDownButtonComponent,
    jqxDropDownListComponent,
    jqxEditorComponent,
    jqxExpanderComponent,
    jqxFileUploadComponent,
    jqxFormattedInputComponent,
    jqxGaugeComponent,
    jqxInputComponent,
    jqxKanbanComponent,
    jqxKnobComponent,
    jqxLayoutComponent,
    jqxLinearGaugeComponent,
    jqxLinkButtonComponent,
    jqxListBoxComponent,
    jqxListMenuComponent,
    jqxLoaderComponent,
    jqxMaskedInputComponent,
    jqxMenuComponent,
    jqxNavBarComponent,
    jqxNavigationBarComponent,
    jqxNotificationComponent,
    jqxNumberInputComponent,
    jqxPanelComponent,
    jqxPasswordInputComponent,
    jqxPivotDesignerComponent,
    jqxPivotGridComponent,
    jqxPopoverComponent,
    jqxProgressBarComponent,
    jqxRadioButtonComponent,
    jqxRangeSelectorComponent,
    jqxRatingComponent,
    jqxRepeatButtonComponent,
    jqxResponsivePanelComponent,
    jqxRibbonComponent,
    jqxSchedulerComponent,
    jqxScrollBarComponent,
    jqxScrollViewComponent,
    jqxSliderComponent,
    jqxSortableComponent,
    jqxSplitterComponent,
    jqxSwitchButtonComponent,
    jqxTabsComponent,
    jqxTagCloudComponent,
    jqxTextAreaComponent,
    jqxToggleButtonComponent,
    jqxToolBarComponent,
    jqxTooltipComponent,
    jqxTreeComponent,
    jqxTreeGridComponent,
    jqxTreeMapComponent,
    jqxValidatorComponent,
    jqxWindowComponent,
    ProfileLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SelectModule,
    HttpClientModule,
    ChartsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    SweetAlert2Module.forRoot({
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      progressBar: false,
      preventDuplicates: true
    })
  ],
  providers: [
    AuthGuard,
    StudyRequiredGuard,
    NoStudyGuard,
    StatusService,
    HttpClientModule,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
