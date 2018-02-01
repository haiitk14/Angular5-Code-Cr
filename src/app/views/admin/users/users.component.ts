import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../api/services';
import { NewUser } from '../../../api/models/new-user';
import { User } from '../../../api/models/user';
import { ViewUsers } from '../../../api/models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { AdminService } from '../../../api/services/admin.service';

import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({ name: 'userFilter' })
export class UserFilterPipe implements PipeTransform {
  public transform(values: User[], filter: string): any[] {
    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter(
      v => v.USERNAM.toLowerCase().indexOf(
        filter.toLowerCase()) >= 0);
  }
}

@Pipe({ name: 'connectionsFilter' })
export class ConnectionsFilterPipe implements PipeTransform {
  public transform(values: User[], filter: string): any[] {
    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter(
      v => v.USERNAM.toLowerCase().indexOf(
        filter.toLowerCase()) >= 0);
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('modalAddUser') public modalAddUser: ModalDirective;
  public activePage = 'users';
  public filterString = '';
  public filterConnections = '';
  public selectUser: User;
  public isSavingUser = false;
  public isUpdateUser = false;
  public isDeleteUser = false;
  public isDisconnectUser = false;
  public isRefreshUser = false;
  public user: NewUser;
  public emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  public listConnectUsers: Object;
  public numberConnects = 0;
  public listConnections: Object;
  public listUsers: Array<ViewUsers>;

  constructor(private admin: AdminService, private router: Router, private toastr: ToastrService) {
    this.user = new NewUser();
  }

  ngOnInit() {
  }

  openPageUsers() {
    this.activePage = 'users';
  }

  openPageConnections() {
    this.activePage = 'connections';
    this.loadConnections();
  }

  onSelect(user) {
    this.selectUser = user;
    this.user = {
      username: user.USERNAM,
      email: user.USERMAIL,
      password: '',
      confirmpassword: ''
    };
  }

  newUser() {
    if (!this.user.username) {
      swal('Oops..', 'Please specify username!', 'warning');
      return;
    }
    if (this.user.username.length < 5 || this.user.username.length > 30) {
      swal('Oops..', 'Please username ( 5 : 30 )', 'warning');
      return;
    }
    if (!this.user.email) {
      swal('Oops..', 'Please specify email!', 'warning');
      return;
    }
    if (!this.emailPattern.test(this.user.email)) {
      swal('Oops..', ' Email is incorrect!', 'warning');
      return;
    }
    if (!this.user.password) {
      swal('Oops..', 'Please specify password!', 'warning');
      return;
    }
    if (this.user.password.length < 5 || this.user.password.length > 30) {
      swal('Oops..', 'Please password ( 5 : 30 )', 'warning');
      return;
    }
    if (!this.user.confirmpassword) {
      swal('Oops..', 'Please specify confirm password!', 'warning');
      return;
    }
    if (this.user.password !== this.user.confirmpassword) {
      swal('Oops..', 'Password was different to the confirm password!', 'warning');
      return;
    }
    this.isSavingUser = true;
    this.admin.newUser({
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      confirmpassword: this.user.confirmpassword
    }).subscribe(
      response => {
        let success = true;
        if (response === 0) {
          success = false;
        }

        if (success) {
          this.modalAddUser.hide();
          this.user = new NewUser();
          this.toastr.success('Create user', 'successfully');
          this.router.navigate(['/admin']);
        } else {
          swal('Oops..', 'Create user error!', 'error');
        }
        this.isSavingUser = false;
      },
      err => {
        this.isSavingUser = false;
      },
      () => {
        this.isSavingUser = false;
        this.refrestListUsers();
      }
    );
  }

  refrestListUsers() {
    this.isRefreshUser = true;
    this.admin.getUsers()
      .subscribe(
      data => {
        if (data) {
          this.listUsers = data;
          const listOff = this.listUsers['offline'];
          const listOn = this.listUsers['online'];

          for (let i = 0; i < listOff.length; i++) {
            for (let j = 0; j < listOn.length; j++) {
              if (parseInt(listOff[i].ID_USER, 10) === parseInt(listOn[j].ID_USER, 10)) {
                listOff.splice(i, 1);
              }
            }
          }
        }
      },
      err => {
        console.log(err);
      },
      () => {
        // console.log('find completed');
      }
      );
  }

  delUser(user) {
    swal({
      title: 'Are you sure?',
      text: 'You won`t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.isDeleteUser = true;
        this.admin.deleteUser(user.ID_USER)
          .subscribe(
            data => {
              this.isDeleteUser = false;
              this.toastr.success('Update user', 'successfully');
            },
            err => {
              this.isDeleteUser = false;
              console.log(err);
            },
            () => {
              this.isDeleteUser = false;
              this.refrestListUsers();
              this.user = new NewUser();
            }
          );
      }
    });
  }

  updateUser(userUpdate) {
    if (!this.user.username) {
      swal('Oops..', 'Please specify username!', 'warning');
      return;
    }
    if (this.user.username.length > 30) {
      swal('Oops..', 'Please username ( 1 : 30 )', 'warning');
      return;
    }
    if (!this.user.email) {
      swal('Oops..', 'Please specify email!', 'warning');
      return;
    }
    if (!this.emailPattern.test(this.user.email)) {
      swal('Oops..', ' Email is incorrect!', 'warning');
      return;
    }
    if (!this.user.password) {
      swal('Oops..', 'Please specify password!', 'warning');
      return;
    }
    if (!this.user.confirmpassword) {
      swal('Oops..', 'Please specify confirm password!', 'warning');
      return;
    }
    if (this.user.password !== this.user.confirmpassword) {
      swal('Oops..', 'Password was different to the confirm password!', 'warning');
      return;
    }
    this.isUpdateUser = true;
    const body = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      confirmpassword: this.user.confirmpassword
    };
    this.admin.updateUser({
      id: userUpdate.ID_USER,
      body: body
    }).subscribe(
      (response: any[]) => {
        let success = true;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          if (element !== 1) {
            success = false;
            break;
          }
        }
        if (success) {
          this.toastr.success('Update user', 'successfully');
          this.router.navigate(['/admin']);
        } else {
          swal('Oops..', 'Update user error!', 'error');
        }
        this.isUpdateUser = false;
      },
      err => {
        this.isUpdateUser = false;
      },
      () => {
        this.modalAddUser.hide();
        this.user = new NewUser();
        this.isUpdateUser = false;
        this.refrestListUsers();
        this.user = new NewUser();
      }
    );
  }

  disconnectUser(userCurr) {
    const idUser = userCurr.ID_USER;
    swal({
      title: 'Are you sure?',
      text: 'Confirm logout',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK !'
    }).then((result) => {
      this.isDisconnectUser = true;
      if (result.value) {
        swal({
          title: 'Are you sure?',
          text: 'Reset the status of the studies?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK !'
        }).then((res) => {
          if (res.value) {
            this.admin.disconnectUser({
              id: idUser,
              reset: 1
            }).subscribe(
              data => {
                this.toastr.success('Disconnect complete', 'successfully');
                this.isDisconnectUser = false;
                this.user =  new NewUser();
              },
              err => {
                console.log(err);
                this.isDisconnectUser = false;
              },
              () => {
                this.isDisconnectUser = false;
                this.refrestListUsers();
              }
              );
          } else {
            this.admin.disconnectUser({
              id: idUser,
              reset: 1
            }).subscribe(
              data => {
                this.toastr.success('Disconnect complete', 'successfully');
                this.isDisconnectUser = false;
                this.user =  new NewUser();
              },
              err => {
                console.log(err);
                this.isDisconnectUser = false;
              },
              () => {
                this.isDisconnectUser = false;
                this.refrestListUsers();
              }
              );
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.refrestListUsers();
  }

  changesRecordConnections() {
    this.loadConnections();
  }

  loadConnections() {
    this.admin.loadConnections(this.numberConnects).subscribe(
      data => {
        this.listConnections = data;
        let dateConnection: any;
        let dateDisconnection: any;
        const options = {
          weekday: 'long', year: 'numeric', month: 'short',
          day: 'numeric', hour: '2-digit', minute: '2-digit', seconds: '2-digit'
        };
        for (const item in data) {

          if (data[item].DATE_DISCONNECTION !== null) {
            dateConnection = Date.parse(data[item].DATE_CONNECTION);
            dateDisconnection = Date.parse(data[item].DATE_DISCONNECTION);
            const period = dateDisconnection - dateConnection;
            data[item].PERIOD = this.msToHMS(period);
            data[item].DATE_CONNECTION = (new Date(dateConnection)).toLocaleTimeString('en-us', options);
            data[item].DATE_DISCONNECTION = (new Date(dateDisconnection)).toLocaleTimeString('en-us', options);
          } else {
            data[item].DATE_CONNECTION = (new Date(Date.parse(data[item].DATE_CONNECTION))).toLocaleTimeString('en-us', options);
          }
          // console.log('ok');
        }
      },
      err => {
        console.log(err);
      },
      () => {

      }
      );
  }

  msToHMS( ms ) {
    let hours: any;
    let minutes: any;
    let seconds: any;
    seconds = Math.floor( ms / 1000 );
    hours = Math.floor( seconds / 3600 );
    minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    hours = hours < 10 ? ('0' + hours) : hours;
    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    seconds = seconds < 10 ? ('0' + seconds) : seconds;

    return  hours + ':' + minutes + ':' + seconds;
  }
}
