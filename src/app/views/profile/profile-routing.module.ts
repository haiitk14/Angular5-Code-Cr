import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserreferencesComponent } from './userreferences/userreferences.component';

const routes: Routes = [
  {
    path: '',
    component: UserreferencesComponent,
    children: [
      {
        path: '',
        redirectTo: 'userreferences',
        pathMatch: 'full',
      },
      {
        path: 'userreferences',
        component: UserreferencesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
