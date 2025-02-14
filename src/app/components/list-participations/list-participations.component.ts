import {Component, OnInit} from '@angular/core';
import {ParticipationService} from "../../services/participation.service";
import {ParticipationDetailed} from "../../interfaces/participation-detailed";

@Component({
  selector: 'app-list-participations',
  templateUrl: './list-participations.component.html',
  styleUrls: ['./list-participations.component.css']
})
export class ListParticipationsComponent implements OnInit {
  participations: ParticipationDetailed[] = [];
  constructor(
    private participationService: ParticipationService
  ) {
  }

  ngOnInit(): void {
    this.participationService.getParticipations().subscribe(
      (data: ParticipationDetailed[]) => {
        this.participations = data;
      }
    )
  }
}
