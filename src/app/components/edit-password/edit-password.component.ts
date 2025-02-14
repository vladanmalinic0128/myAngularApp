import {Component, HostListener} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings.service";
import {EditPassword} from "../../interfaces/edit-password";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent {
  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmedPassword = control.get('confirmedPassword');

    if (!newPassword || !confirmedPassword)
      return null;

    return newPassword.value === confirmedPassword.value ? null : {passwordMismatch: true};
  }

  wrapForm: boolean = true;
  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$")]],
    newPassword: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$")]],
    confirmedPassword: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$")]]
  }, {
    validators: this.passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private messageService: MessageService,
    private router: Router
  ){}

  get currentPassword() {
    return this.passwordForm.controls['currentPassword'];
  }

  get newPassword() {
    return this.passwordForm.controls['newPassword'];
  }

  get confirmedPassword() {
    return this.passwordForm.controls['confirmedPassword'];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.wrapForm = window.innerWidth > 600;
  }


  submitPassword() {
    const postData = {...this.passwordForm.value};
    delete postData.confirmedPassword;

    this.settingsService.changePassword({
      oldPassword: postData.currentPassword,
      newPassword: postData.newPassword
    } as EditPassword).subscribe(
       (response: HttpResponse<any>) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Password changed successfully'});
        this.passwordForm.reset();
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
        console.log(err);

      }
    )
  }
}
