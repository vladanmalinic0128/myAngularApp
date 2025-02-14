import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Login} from "../../interfaces/login";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {LoginResponse} from "../../interfaces/login-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  verifyMailMode: boolean = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const postData = { ...this.loginForm.value };
    console.log(this.loginForm.value);
    if(this.verifyMailMode === true) {
      this.authService.sendConfirmationMail(postData as Login).subscribe(
        (response: LoginResponse) => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Check your email'});
          this.verifyMailMode = false;
        },
        err => {
          if(err.status === 401)
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Wrong credentials'});
            this.verifyMailMode = true;
          if(err.status === 409) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email is already verified.'});
            this.verifyMailMode = false;
          }
          if(err.status === 423) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Account is locked. Please contact administrator.'});
            this.verifyMailMode = true;

          }
        }
      )

    } else {
      this.authService.loginUser(postData as Login).subscribe(
        async (response: LoginResponse) => {

          sessionStorage.setItem("jwtToken", response.token);
          sessionStorage.setItem("username", response.username);
          sessionStorage.setItem("email", response.email);
          sessionStorage.setItem("firstname", response.firstname);
          sessionStorage.setItem("lastname", response.lastname);
          sessionStorage.setItem("avatar", response.avatar);
          sessionStorage.setItem("city", response.city);

          await this.router.navigate(['/main']);
        },
        err => {
          if(err.status === 500)
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Wrong credentials'})
          if(err.status === 403) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email not verified'});
            this.verifyMailMode = true;
          }
        }
      );
    }

  }
}
