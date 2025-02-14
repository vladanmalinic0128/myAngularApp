import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FitnessProgramDetails} from "../../interfaces/fitness-program-details";
import {FitnessProgramsService} from "../../services/fitness-programs.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-fitness-program-details',
  templateUrl: './fitness-program-details.component.html',
  styleUrls: ['./fitness-program-details.component.css']
})
export class FitnessProgramDetailsComponent implements OnInit {
  fitnessProgramDetails: FitnessProgramDetails;

  wrapForm: boolean = true;
  showParticipationTab: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.wrapForm = window.innerWidth > 600;
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 3
    }
  ];

  images: any;

  constructor(private fitnessProgramService: FitnessProgramsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
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

        this.fitnessProgramService.getFitnessProgramStatus(this.activatedRoute.snapshot.params['id']).subscribe(
          (data: boolean) => {
            this.showParticipationTab = data;
          }, err => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
          }
        );
      }, err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error});
      }
    );
  }

  isUserLoggedIn() {
    return sessionStorage.getItem("username") !== null;
  }
}
