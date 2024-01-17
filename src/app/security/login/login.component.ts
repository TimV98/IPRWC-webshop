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
  roles: string[] = this.authService.roles;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  login() {
    this.submitted = true;
    this.loginCredentials.email = this.loginForm?.value.email;
    this.loginCredentials.password = this.loginForm?.value.password
    this.authService.loginUser(this.loginCredentials).subscribe({
      next: data => {
        const token: { sub: string,
          iat: number,
          exp: number,
          roles: string[] } = this.authService.parseToken(data.token);
        this.authService.roles = token.roles;
        localStorage.setItem('token', data.token)
        if (this.authService.getLoginStatus()) {
          this.authService.sendLoginStatus(true)
          const adminRole = token.roles.find(role => role === "ROLE_ADMIN")
          if (adminRole){
            this.authService.isAdmin.next(true);
          }
        }

        this.router.navigate(['/profile'])
      }, error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.loginForm.controls['password'].setErrors({'invalid': true},)

          this.showErrorMessage = true;
          this.errorMessage = "Wrong Credentials!";
        }
      }

    })
  }

}
