import { Component, OnInit } from '@angular/core';
import { SettingsNavItems } from '../settings.nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public subnav;

  constructor(public router: Router) { }

  ngOnInit() {
    this.subnav = SettingsNavItems;
  }
}
