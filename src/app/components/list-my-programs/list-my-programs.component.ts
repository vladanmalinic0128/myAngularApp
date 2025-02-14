import {Component} from '@angular/core';
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-list-my-programs',
  templateUrl: './list-my-programs.component.html',
  styleUrls: ['./list-my-programs.component.css']
})
export class ListMyProgramsComponent {
  fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.myPrograms;

}
