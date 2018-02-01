import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Study } from '../../api/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-layout',
  templateUrl: './members-layout.component.html',
  styleUrls: ['./members-layout.component.scss']
})

export class MembersLayoutComponent implements OnInit, AfterViewInit {
  public nav = [
    {
      name: 'Input',
      url: '/input',
      icon: 'icon-note',
    },
    {
      name: 'Calculate',
      url: '/calculation',
      icon: 'icon-energy',
    },
    {
      name: 'Output',
      url: '/output',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Report',
      url: '/report',
      icon: 'icon-doc',
    }
  ];

  public subnav = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  subnavChangedHandler(subnav) {
    this.subnav = subnav;
    console.log('subnav received:');
    console.log(subnav);
  }

}
