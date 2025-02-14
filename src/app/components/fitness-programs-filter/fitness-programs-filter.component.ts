import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from "../../interfaces/category";
import {Location} from "../../interfaces/location";
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {LocationService} from "../../services/location.service";
import {CategoryService} from "../../services/category.service";
import {FitnessProgramsService} from "../../services/fitness-programs.service";
import {FitnessProgramFilterRequest} from "../../interfaces/fitness-program-filter-request";
import {HttpResponse} from "@angular/common/http";
import {FitnessProgram} from "../../interfaces/fitness-program";

@Component({
  selector: 'app-fitness-programs-filter',
  templateUrl: './fitness-programs-filter.component.html',
  styleUrls: ['./fitness-programs-filter.component.css']
})
export class FitnessProgramsFilterComponent implements OnInit{
  @Output() filterApplied: EventEmitter<FitnessProgram[]> = new EventEmitter<FitnessProgram[]>();

  categories: Category[]=[];
  chosenCategory: Category = null;

  locations: Location[] = [];
  chosenLocation: Location = null;

  weightLevels: number[] = [1,2,3,4,5];
  startWeightLevel: number = null;
  endWeightLevel: number = null;

  startPrice: number;
  endPrice: number;

  private priceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const min = control.get('startPrice').value;
    const max = control.get('endPrice').value;

    if(!min || !max)
      return null;

    return min > max ? {priceMinMax: true}: null;
  }

  private weightLevelValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const min = control.get('startWeightLevel').value;
    const max = control.get('endWeightLevel').value;

    if(!min || !max)
      return null;

    return min > max ? {weightLevelMinMax: true}: null;
  }


  filterForm = this.fb.group({
    name: ['', Validators.pattern('^[a-zA-Z0-9\\s]+$')],
    selectedCategory: [null],
    selectedLocation: [null],
    startWeightLevel: [0],
    endWeightLevel: [0],
    startPrice: [0],
    endPrice: [0]
  }, {
      validators: [this.priceValidator, this.weightLevelValidator]
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private fitnessProgramService: FitnessProgramsService
  ) {
  }

  get name() {
    return this.filterForm.controls['name'];
  }

  get selectedCategory() {
    return this.filterForm.controls['selectedCategory'];
  }

  get selectedLocation() {
    return this.filterForm.controls['selectedLocation'];
  }

  get startWeightLevelEl() {
    return this.filterForm.controls['startWeightLevel'];
  }

  get endWeightLevelEl() {
    return this.filterForm.controls['endWeightLevel'];
  }

  get startPriceEl() {
    return this.filterForm.controls['startPrice'];
  }

  get endPriceEl() {
    return this.filterForm.controls['endPrice'];
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    }, (error) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch categories"});
    });

    this.locationService.getAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
    },(error) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch locations"});
    });
  }

  submitDetails() {
    const postData = {...this.filterForm.value};

    this.fitnessProgramService.filterFitnessProgram({
      name: !postData.name ? null: postData.name,
      categoryId: this.chosenCategory ? this.chosenCategory.id: null,
      locationId: this.chosenLocation?.id ? this.chosenLocation.id: null,
      startWeightLevel: postData.startWeightLevel == 0 ? null: postData.startWeightLevel,
      endWeightLevel: postData.endWeightLevel == 0 ? null: postData.endWeightLevel,
      startPrice: postData.startPrice == 0 ? null: postData.startPrice,
      endPrice: postData.endPrice == 0 ? null: postData.endPrice
    } as FitnessProgramFilterRequest).subscribe(
       (response: FitnessProgram[]) => {
         this.filterApplied.emit(response);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
      }
    );
  }

}
