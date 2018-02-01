import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Login } from '../../api/models/login';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TextService } from '../../shared/text.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  user: Login = new Login();

  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService, private text: TextService) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.auth.login(this.user.username, this.user.password)
      .subscribe(
        data => {
          console.log('User is logged in');
          this.toastr.success('Welcome back', 'Authenticated successfully');
          this.router.navigate(['/']);
        },
        error => {
          console.log('login failed!');
          swal('Oops...', 'Logged in failed', 'error');
        }
      );
  }

  forgotPassword() {
    swal('Forgot password?', 'Please contact our Administrator', 'warning');
  }

}
