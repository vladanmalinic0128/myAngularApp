import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FileSelectEvent, FileUpload} from "primeng/fileupload";
import {Category} from "../../interfaces/category";
import {Location} from "../../interfaces/location";
import {SpecialAttributes} from "../../interfaces/special-attributes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {CategoryService} from "../../services/category.service";
import {LocationService} from "../../services/location.service";
import {FitnessProgramsService} from "../../services/fitness-programs.service";
import {ImageDetails} from "../../interfaces/image-details";
import {FitnessProgramDetails} from "../../interfaces/fitness-program-details";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-fitness-program',
  templateUrl: './edit-fitness-program.component.html',
  styleUrls: ['./edit-fitness-program.component.css']
})
export class EditFitnessProgramComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;


  wrapForm: boolean = true;
  categories: Category[] = [];
  locations: Location[] = [];
  chosenCategory: Category = null;
  chosenLocation: Location = null;
  specialAttributes: SpecialAttributes[] = null;
  linkEnabled: boolean = false;
  fitnessProgramDetails: FitnessProgramDetails = null;
  fitnessProgramForm: FormGroup;


  uploadedFiles: File[] = [];
  activeIndex: number = 0;
  scrollableTabs: any[] = null;
  private images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private fitnessProgramService: FitnessProgramsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.fitnessProgramService.getFintessProgram(this.activatedRoute.snapshot.params['id']).subscribe(
      (data: FitnessProgramDetails) => {
        this.fitnessProgramDetails = data;
        this.images = data.images.map((i, n) => {
          return {
            itemImageSrc: i.value,
            thumbnailImageSrc: i.value,
            alt: i.name,
            title: i.name
          }
        });


        this.fitnessProgramForm = this.fb.group({
          name: [this.fitnessProgramDetails.name, Validators.required],
          price: [this.fitnessProgramDetails.price, Validators.required],
          selectedCategory: [null, Validators.required],
          selectedLocation: [null, Validators.required],
          weightLevel: [this.fitnessProgramDetails.weightLevel, Validators.required],
          duration: [this.convertTimeToMinutes(this.fitnessProgramDetails.duration), Validators.required],
          description: [this.fitnessProgramDetails.description, Validators.required],
          link: [this.fitnessProgramDetails.link]
        });

        const files: File[] = this.fitnessProgramDetails.images.map(f => {
          return this.createFileFromObject(f);
        });
        this.uploadedFiles.push(...files);
        this.fileUpload.files=this.uploadedFiles;
        this.fileUpload.choose();

        this.categoryService.getAllCategories().subscribe(
          (data: Category[]) => {
            this.categories = data;
            this.chosenCategory = this.categories.find(c => c.name === this.fitnessProgramDetails.categoryName);
          }, (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch categories"});
          });

        this.locationService.getAllLocations().subscribe(
          (data: Location[]) => {
            this.locations = data;
            this.chosenLocation = this.locations.find(l => l.name === this.fitnessProgramDetails.locationName);
          }, (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch locations"});
          });

        this.fitnessProgramForm.get('selectedCategory').valueChanges.subscribe((selectedCategory) => {
          this.onSelectedCategoryChange(selectedCategory);
        });

        this.fitnessProgramForm.get('selectedLocation').valueChanges.subscribe((selectedLocation) => {
          this.onSelectedLocationChange(selectedLocation);
        });
      });
  }

  initializeForm(): void {
    this.fitnessProgramForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      selectedCategory: [null, Validators.required],
      selectedLocation: [null, Validators.required],
      weightLevel: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      link: ['']
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
          value: this.fitnessProgramDetails.special_attrs.find(sa => sa.name === item.name)?.value
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
    if(value === null)
      return;
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

  async submitDetails() {
    const postData = {...this.fitnessProgramForm.value};
    let fitnessProgramDetails = {
      id: this.activatedRoute.snapshot.params['id'],
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

    if(this.images !== null) {
      console.log(this.images);
      this.images.forEach((element) => {
        fitnessProgramDetails.images.push({
          image: element?.itemImageSrc? element.itemImageSrc: element
        } as ImageDetails);
      });
    }

    this.fitnessProgramService.editFitnessProgram(fitnessProgramDetails as FitnessProgramDetails).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Fitness program updated'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});

      }
    );

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

  private convertTimeToMinutes(timeString: string) {
    const timeParts = timeString.split(':');

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    const totalMinutes = (hours * 60) + minutes;

    return totalMinutes;
  }

  createFileFromObject(obj) {
    const { name, value } = obj;
    const arr = value.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], name, { type: mime });
  }

  // encodeFileToBase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = error => reject(error);
  //
  //     const blob = new Blob([file], { type: file.type });
  //
  //     reader.readAsDataURL(blob);
  //   });
  // }
  //
  // async encodeFiles() {
  //   for (const image of this.images) {
  //     const base64String = await this.encodeFileToBase64(image);
  //     this.fitnessProgramDetails.images.push({
  //       image: base64String
  //     });
  //   }
  // }
}
