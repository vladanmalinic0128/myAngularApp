import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PaymentTypeService} from "../../services/payment-type.service";
import {PaymentType} from "../../interfaces/payment-type";
import {Message, MessageService} from "primeng/api";
import {ParticipationService} from "../../services/participation.service";
import {Participation} from "../../interfaces/participation";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit{
  paymentTypes: PaymentType[] = [];
  chosenPaymentType: PaymentType = null;
  participationForm = this.fb.group({
    selectedPaymentType: [null, Validators.required],
    cardNumber: ['']
  });


  constructor(
    private fb: FormBuilder,
    private paymentTypeService: PaymentTypeService,
    private messageService: MessageService,
    private participationService: ParticipationService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if(this.isUserLoggedIn() === false)
      return;
    this.paymentTypeService.getAllPaymentTypes().subscribe(
      (data: PaymentType[]) => {
        this.paymentTypes = data;
      }, (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot fetch payment types"});
      }
    )
  }

  checkCardNumber() {
    if(this.chosenPaymentType === null)
      return false;
    if(this.chosenPaymentType !== null && this.chosenPaymentType.id === 1)
      return true;
    else {
      if(this.participationForm.controls.cardNumber.value.length < 19 ||
        this.participationForm.controls.cardNumber.value.includes("_"))
        return false;
      else
        return true;
    }
  }

  submitParticipation() {
    const postData = {...this.participationForm.value};


    this.participationService.addParticipation({
      fitnessProgramId: this.activatedRoute.snapshot.params['id'],
      paymentTypeId: this.chosenPaymentType.id,
      cardNumber: postData.cardNumber,
    } as Participation).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Participation created'});
      },
      (err)=> {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});

      }
    )
  }

  isUserLoggedIn() {
    return sessionStorage.getItem("username") !== null;
  }
}
