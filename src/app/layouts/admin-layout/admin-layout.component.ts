import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public nav = [
    {
      name: 'Users',
      url: '/admin/users',
      icon: 'fa fa-users',
    },
    {
      name: 'Units',
      url: '/admin/units',
      icon: 'fa fa-balance-scale',
    },
    {
      name: 'Translations',
      url: '/admin/translations',
      icon: 'fa fa-language',
    },
    {
      name: 'Back',
      url: '/home',
      icon: 'icon-action-undo',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
