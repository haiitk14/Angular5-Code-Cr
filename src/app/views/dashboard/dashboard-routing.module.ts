import { OpenStudyComponent } from './open-study/open-study.component';
import { StartPageComponent } from './start-page/start-page.component';
import { NewStudyComponent } from './new-study/new-study.component';
import { ImportComponent } from './import/import.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: StartPageComponent,
  },
  {
    path: 'new',
    component: NewStudyComponent,
  },
  {
    path: 'open',
    component: OpenStudyComponent,
  },
  {
    path: 'import',
    component: ImportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
