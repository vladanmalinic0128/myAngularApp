import {Component, Input} from '@angular/core';
import {FitnessProgram} from "../../interfaces/fitness-program";
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-fitness-program-with-filter',
  templateUrl: './fitness-program-with-filter.component.html',
  styleUrls: ['./fitness-program-with-filter.component.css']
})
export class FitnessProgramWithFilterComponent {
  @Input() fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.allPrograms;

  fitnessPrograms: FitnessProgram[];

  filterApplied($event: FitnessProgram[]) {
    console.log($event);
    this.fitnessPrograms = $event;
  }
}
