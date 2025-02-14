import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PaymentTypeService} from "../../services/payment-type.service";
import {MessageService} from "primeng/api";
import {ParticipationService} from "../../services/participation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DiaryService} from "../../services/diary.service";
import {Diary} from "../../interfaces/diary";

@Component({
  selector: 'app-add-diary',
  templateUrl: './add-diary.component.html',
  styleUrls: ['./add-diary.component.css']
})
export class AddDiaryComponent {
  trainingDurationValue: number = 0;
  currentWeightValue: number = 0.0;

  diaryForm = this.fb.group({
    trainingDuration: [this.trainingDurationValue, Validators.required],
    currentWeight: [this.currentWeightValue, Validators.required],
    description: ['', Validators.required]
  });


  constructor(
    private fb: FormBuilder,
    private diaryService: DiaryService,
    private messageService: MessageService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

  }

  get trainingDuration() {
    return this.diaryForm.controls['trainingDuration'];
  }

  get currentWeight() {
    return this.diaryForm.controls['currentWeight'];
  }

  get description() {
    return this.diaryForm.controls['description'];
  }

  checkValidity() {
    if(this.trainingDurationValue < 1)
      return false;
    else if(this.currentWeightValue < 1)
      return false;
    else if(this.diaryForm.controls['description'].value.length < 1)
      return false;
    else
      return true;
  }

  submitRecord() {
    const postData = {...this.diaryForm.value};
    this.diaryService.addDiaryRecord({
      currentWeight: postData.currentWeight,
      trainingDuration: postData.trainingDuration,
      description: postData.description
    } as Diary).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Diary record created'});
      },
      (err)=> {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});

      }
    );
  }
}
