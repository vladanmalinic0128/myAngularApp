import { Component } from '@angular/core';
import {FitnessProgramsRole} from "../../enums/fitness-programs-role";

@Component({
  selector: 'app-list-bought-programs',
  templateUrl: './list-bought-programs.component.html',
  styleUrls: ['./list-bought-programs.component.css']
})
export class ListBoughtProgramsComponent {
  fitnessProgramsRole: FitnessProgramsRole = FitnessProgramsRole.boughtPrograms;
}
