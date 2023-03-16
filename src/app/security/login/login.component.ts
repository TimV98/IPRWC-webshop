import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginCredentials} from "../../models/LoginCredentials";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean;
  loginForm: FormGroup;
  private loginCredentials: LoginCredentials = new LoginCredentials();
  showErrorMessage: boolean;
  errorMessage: string;
  role: string = this.authService.role;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }


  login() {
    this.submitted = true;
    this.loginCredentials.email = this.loginForm?.value.email;
    this.loginCredentials.password = this.loginForm?.value.password
    this.authService.loginUser(this.loginCredentials).subscribe({
      next: res => {
        this.authService.role = res.roles[0];
        this.role = this.authService.encryptRole(res.roles[0]);
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('role', this.role)
        if (this.authService.getLoginStatus()) {
          this.authService.sendLoginStatus(true)
        }
        if (localStorage.getItem('role')) {
          if (this.authService.decryptRole(this.role) === "ROLE_ADMIN") {
            this.authService.sendAdmin();
          }
        }
        this.router.navigate(['/profile'])
      }, error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.loginForm.controls['email'].setErrors({'invalid': true})
          this.loginForm.controls['password'].setErrors({'invalid': true})

          this.showErrorMessage = true;
          this.errorMessage = "Wrong Credentials!";
        }
      }

    })
  }

}
