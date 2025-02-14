import { Component } from '@angular/core';
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-list-external-programs',
  templateUrl: './list-external-programs.component.html',
  styleUrls: ['./list-external-programs.component.css']
})
export class ListExternalProgramsComponent {
  fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.otherPrograms;
}
