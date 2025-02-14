import {Component, Input} from '@angular/core';
import {FitnessProgramsService} from "../../services/fitness-programs.service";
import {FitnessProgram} from "../../interfaces/fitness-program";
import {MessageService, SelectItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-fintess-programs',
  templateUrl: './fintess-programs.component.html',
  styleUrls: ['./fintess-programs.component.css']
})
export class FintessProgramsComponent {
  sortOptions!: SelectItem[];
  sortKey!: string;
  sortOrder!: number;
  sortField!: string;

  @Input() fitnessPrograms: FitnessProgram[] = [];
  @Input() fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.otherPrograms;
  layout: 'grid' | 'list' = 'grid';

  constructor(private fitnessProgramsService: FitnessProgramsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService) {}

  ngOnInit() {
    this.fitnessProgramsService.getAllFitnessPrograms(this.fitnessProgramsRole).subscribe((data: FitnessProgram[]) => this.fitnessPrograms = data);

    this.sortOptions = [
      { label: 'Name - A to Z', value: 'name' },
      { label: 'Name - Z to A', value: '!name' },
      { label: 'Intensity - Lowest to Highest', value: 'weightLevel' },
      { label: 'Intensity - Highest to Lowest', value: '!weightLevel' },
      { label: 'Price - Lowest to Highest', value: 'price' },
      { label: 'Price - Highest to Lowest', value: '!price' },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;
    console.log(this.sortKey);

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getSeverity(fitnessProgram: FitnessProgram) {
    switch (fitnessProgram.locationName) {
      case 'Online':
        return 'success';

      default:
        return 'warning';
    }
  };

  goToDetails(fitnessProgram: FitnessProgram) {
    if (this.activatedRoute.snapshot.routeConfig.path === 'my-programs') {
      this.router.navigate(['../fitness-programs', fitnessProgram.id], { relativeTo: this.activatedRoute });
    } else if (this.activatedRoute.snapshot.routeConfig.path === 'external-programs') {
      this.router.navigate(['../fitness-programs', fitnessProgram.id], { relativeTo: this.activatedRoute });
    } else if (this.activatedRoute.snapshot.routeConfig.path === 'bought-programs') {
      this.router.navigate(['../fitness-programs', fitnessProgram.id], { relativeTo: this.activatedRoute });
    } else if (this.activatedRoute.snapshot.routeConfig.path === 'finished-programs') {
      this.router.navigate(['../fitness-programs', fitnessProgram.id], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['fitness-programs', fitnessProgram.id], { relativeTo: this.activatedRoute });
    }
  }

  checkMyFitnessProgram() {
    return this.fitnessProgramsRole === FitnessProgramsRole.myPrograms;
  }


  checkBoughtFitnessPrograms() {
    return this.fitnessProgramsRole === FitnessProgramsRole.boughtPrograms;
  }

  checkFinishedFitnessPrograms() {
    return this.fitnessProgramsRole === FitnessProgramsRole.finishedPrograms;
  }

  deleteFitnessProgram(fitnessProgram: FitnessProgram) {
    this.fitnessProgramsService.deleteFintessProgram(fitnessProgram.id).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Fitness program deleted successfully'});
        window.location.reload();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error in deleting fitness program'});
      }
    );
  }

  finishFitnessProgram(fitnessProgram: FitnessProgram) {
    this.fitnessProgramsService.markFitnessProgramAsFinished(fitnessProgram.id).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Fitness program marked as finished'});
        window.location.reload();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error in finishing fitness program'});
      }
    );
  }

  checkBoughtFitnessProgramsForVideo(fitnessProgram: FitnessProgram) {
    return this.checkBoughtFitnessPrograms() && fitnessProgram.locationName==='Online';
  }

  watchVideoInstructions(fitnessProgram: FitnessProgram) {
    console.log(fitnessProgram.link);
    if (fitnessProgram.link) {
      window.open(fitnessProgram.link, '_blank');
    }
  }

  updateFitnessProgram(fitnessProgram: FitnessProgram) {
    this.router.navigate(['main/edit-fitness-programs/' + fitnessProgram.id]);
  }
}
