import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Study } from '../../api/models';
import { AfterViewInit, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../api/models/user';
import { BsModalRef } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { CommentComponent } from '../../shared/comment/comment.component';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements AfterViewInit, OnInit {
  bsModalRef: BsModalRef;
  @Input() showStudy;

  public study: Study = null;
  public user: User = null;

  constructor(private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    if (localStorage.getItem('study') && this.showStudy !== 'false') {
      this.study = JSON.parse(localStorage.getItem('study'));
    }
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (localStorage.getItem('study') && this.showStudy !== 'false') {
        this.study = JSON.parse(localStorage.getItem('study'));
      }
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  onCloseStudy() {
    localStorage.removeItem('study');
    localStorage.removeItem('meshView');
    localStorage.removeItem('productShape');
    localStorage.removeItem('productView');
    this.study = null;
    this.router.navigate(['/']);
  }

  onShowNotes() {
    this.bsModalRef = this.modalService.show(CommentComponent);
  }
}
