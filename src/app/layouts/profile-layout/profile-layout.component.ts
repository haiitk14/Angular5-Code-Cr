import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {
  public nav = [
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-user',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-wrench',
    },
    {
      name: 'Reference data',
      url: '/references',
      icon: 'fa fa-database',
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
