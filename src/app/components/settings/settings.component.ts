import {Component, HostListener} from '@angular/core';
import {City} from "../../interfaces/city";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {CityService} from "../../services/city.service";
import {FileSelectEvent} from "primeng/fileupload";
import {User} from "../../interfaces/user";
import {HttpResponse} from "@angular/common/http";
import {SettingsService} from "../../services/settings.service";
import {Settings} from "../../interfaces/settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  wrapForm: boolean = true;
  cities: City[] = [];
  chosenCity: City = null;
  image: string = '';
  registerForm = null;
  private settingsSample: Settings;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private cityService: CityService,
    private settingsService: SettingsService
  ) {

  }

  ngOnInit() {
    this.cityService.getAllCities().subscribe(
      (data: City[]) => {
        this.cities = data;
        this.chosenCity = this.cities.find(c => c.name === sessionStorage.getItem('city'));
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch cities"});
      }
    );

    this.image = sessionStorage.getItem('avatar');
      this.registerForm = this.fb.group({
      firstname: [sessionStorage.getItem('firstname'), Validators.required],
      lastname: [sessionStorage.getItem('lastname'), Validators.required],
      selectedCity: [null, Validators.required],
      avatar: [sessionStorage.getItem('avatar')]
    });
  }

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  get lastname() {
    return this.registerForm.controls['lastname'];
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


    this.settingsSample  = {
      firstname: postData.firstname,
      lastname: postData.lastname,
      cityId: this.chosenCity.id,
      image: this.image
    };
    this.settingsService.changeSettings(this.settingsSample).subscribe(
      async (response: HttpResponse<any>) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data updated successfully'});

        sessionStorage.setItem('firstname', this.settingsSample.firstname);
        sessionStorage.setItem('lastname', this.settingsSample.lastname);
        sessionStorage.setItem('avatar', this.image);
        sessionStorage.setItem('city', this.cities.find(c => c.id === this.chosenCity.id)?.name);
        window.location.reload();
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
      }
    );
  }

}
