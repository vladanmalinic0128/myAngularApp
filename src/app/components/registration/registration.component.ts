import {Component, HostListener, OnInit} from '@angular/core';
import {City} from "../../interfaces/city";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {CityService} from "../../services/city.service";
import {FileSelectEvent} from "primeng/fileupload";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  wrapForm: boolean = true;
  cities: City[] = [];
  chosenCity: City = null;
  image: string = '';

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmedPassword = control.get('confirmedPassword');

    if (!password || !confirmedPassword)
      return null;

    return password.value === confirmedPassword.value ? null : {passwordMismatch: true};
  }

  existsByUserValidator = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return new Promise((resolve, reject) => {
      const username = control.value;
      if (!username) {
        resolve({existsByUser: true});
      }

      this.authService.existsByUser(username).subscribe((value:{exists:boolean}) => {
        if(value.exists === true)
          resolve({existsByUser: true});
        else
          resolve(null);
      })

    })
  };

  existsByEmailValidator = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return new Promise((resolve, reject) => {
      const username = control.value;
      if (!username) {
        resolve({existsByUser: true});
      }

      this.authService.existsByEmail(username).subscribe((value:{exists:boolean}) => {
        if(value.exists === true)
          resolve({existsByEmail: true});
        else
          resolve(null);
      })

    })
  };


  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required, this.existsByUserValidator],
    email: ['', [Validators.required, Validators.email], this.existsByEmailValidator],
    password: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$")]],
    confirmedPassword: ['', [Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$")]],
    selectedCity: [null, Validators.required],
    avatar: ['']
  }, {
    validators: this.passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private cityService: CityService
  ) {

  }

  ngOnInit() {
    this.cityService.getAllCities().subscribe(
      (data: City[]) => {
        this.cities = data;
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch cities"});
      }
    )
  }

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  get lastname() {
    return this.registerForm.controls['lastname'];
  }

  get username() {
    return this.registerForm.controls['username'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmedPassword() {
    return this.registerForm.controls['confirmedPassword'];
  }

  get selectedCity() {
    return this.registerForm.controls['selectedCity'];
  }

  get avatar() {
    return this.registerForm.controls['avatar'];
  }

  onFileSelected(value: FileSelectEvent) {
    const file = value.files[0];

    const reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.wrapForm = window.innerWidth > 600;
  }

  submitDetails() {
    const postData = {...this.registerForm.value};
    delete postData.confirmedPassword;


    this.authService.registerUser({
      username: postData.username,
      firstname: postData.firstname,
      lastname: postData.lastname,
      email: postData.email,
      password: postData.password ,
      cityId: this.chosenCity.id,
      avatar: this.image
    } as User).subscribe(
      async (response: HttpResponse<any>) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Verify your email before login'});
        await this.router.navigate(["/login"]);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
        console.log(err);

      }
    );
  }
}
