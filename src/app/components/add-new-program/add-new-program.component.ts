import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../interfaces/category";
import {Location} from "../../interfaces/location";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {CategoryService} from "../../services/category.service";
import {LocationService} from "../../services/location.service";
import {FileSelectEvent, FileUpload} from "primeng/fileupload";
import {SpecialAttributes} from "../../interfaces/special-attributes";
import {FitnessProgramsService} from "../../services/fitness-programs.service";
import {FitnessProgramDetails} from "../../interfaces/fitness-program-details";
import {ImageDetails} from "../../interfaces/image-details";

@Component({
  selector: 'app-add-new-program',
  templateUrl: './add-new-program.component.html',
  styleUrls: ['./add-new-program.component.css']
})
export class AddNewProgramComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;


  wrapForm: boolean = true;
  categories: Category[] = [];
  locations: Location[] = [];
  chosenCategory: Category = null;
  chosenLocation: Location = null;
  specialAttributes: SpecialAttributes[] = null;
  linkEnabled: boolean = false;

  fitnessProgramForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    selectedCategory: [null, Validators.required],
    selectedLocation: [null, Validators.required],
    weightLevel: ['', Validators.required],
    duration: ['', Validators.required],
    description: ['', Validators.required],
    link: ['']
  });

  uploadedFiles: any;
  activeIndex: number = 0;
  scrollableTabs: any[] = null;
  private images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private fitnessProgramService: FitnessProgramsService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch categories"});
      });

    this.locationService.getAllLocations().subscribe(
      (data: Location[]) => {
        this.locations = data;
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch locations"});
      });

    this.fitnessProgramForm.get('selectedCategory').valueChanges.subscribe((selectedCategory) => {
      this.onSelectedCategoryChange(selectedCategory);
    });

    this.fitnessProgramForm.get('selectedLocation').valueChanges.subscribe((selectedLocation) => {
      this.onSelectedLocationChange(selectedLocation);
    });
  }

  onSelectedCategoryChange(selectedCategory: Category) {
    if (selectedCategory === null)
      return;
    this.categoryService.getAllSpecialAttributesByCategory(selectedCategory?.id).subscribe(
      (data: SpecialAttributes[]) => {
        this.specialAttributes = data;
        this.scrollableTabs = this.specialAttributes.map(item => ({
          id: item.id,
          title: item.name,
          content: item.name,
          value: ''
        }));
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch special attributes"});
      });
  }

  onSelectedLocationChange(selectedLocation: Location) {
    const linkControl = this.fitnessProgramForm.get('link');

    if (selectedLocation?.name && selectedLocation.name === 'Online') {
      this.linkEnabled = true;
      linkControl.setValidators([Validators.required]);
    } else {
      this.linkEnabled = false;
      linkControl.clearValidators();
    }
    linkControl.updateValueAndValidity();
  }

  onSelect(value: FileSelectEvent) {
    const files = value.files;

    if (files.length < 1)
      return;
    Array.from(files).forEach((file) => {
      const reader: FileReader = new FileReader();
      reader.onloadend = (e) => {
        const imageDataUrl = reader.result as string;
        this.images.push(imageDataUrl);
      }
      reader.readAsDataURL(file);
    });
  }

  submitDetails() {
    const postData = {...this.fitnessProgramForm.value};
    let fitnessProgramDetails = {
      name: postData.name,
      price: Number(postData.price),
      categoryId: this.chosenCategory.id,
      locationId: this.chosenLocation.id,
      weightLevel: Number(postData.weightLevel),
      duration: postData.duration,
      description: postData.description,
      link: postData.link,
      specialAttributes: [],
      images: []
    };

    if (this.scrollableTabs !== null) {
      this.scrollableTabs.forEach((element) => {
        fitnessProgramDetails.specialAttributes.push({
          id: element.id,
          value: element.value
        } as SpecialAttributes);
      });
    }

    this.images.forEach((element) => {
      fitnessProgramDetails.images.push({
        image: element
      } as ImageDetails);
    });

    this.fitnessProgramService.addFitnessProgram(fitnessProgramDetails as FitnessProgramDetails).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Fitness program created'});
        this.fitnessProgramForm.reset();
        this.images = [];
        this.fileUpload.clear();
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});

      }
    )

  }

  get name() {
    return this.fitnessProgramForm.controls['name'];
  }

  get price() {
    return this.fitnessProgramForm.controls['price'];
  }

  get selectedCategory() {
    return this.fitnessProgramForm.controls['selectedCategory'];
  }

  get selectedLocation() {
    return this.fitnessProgramForm.controls['selectedLocation'];
  }

  get weightLevel() {
    return this.fitnessProgramForm.controls['weightLevel'];
  }

  get duration() {
    return this.fitnessProgramForm.controls['duration'];
  }

  get description() {
    return this.fitnessProgramForm.controls['description'];
  }

  get link() {
    return this.fitnessProgramForm.controls['link'];
  }

  onRemove(event) {
    const reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
      const imageDataUrl = reader.result as string;
      const index = this.images.findIndex(image => image === imageDataUrl);

      if (index !== -1) {
        this.images.splice(index, 1);
      }
    }
    reader.readAsDataURL(event.file);

  }
}
