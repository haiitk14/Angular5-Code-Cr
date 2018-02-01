import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  public nav = [
    {
      name: 'Welcome',
      url: '/home',
      icon: 'icon-home',
    },
    {
      name: 'New Study',
      url: '/new',
      icon: 'icon-star',
    },
    {
      name: 'Open Study',
      url: '/open',
      icon: 'icon-folder-alt',
    },
    {
      name: 'Import',
      url: '/import',
      icon: 'icon-cloud-upload',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
