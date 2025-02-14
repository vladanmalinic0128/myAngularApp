import { Component } from '@angular/core';
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-list-finished-programs',
  templateUrl: './list-finished-programs.component.html',
  styleUrls: ['./list-finished-programs.component.css']
})
export class ListFinishedProgramsComponent {
  fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.finishedPrograms;
}
