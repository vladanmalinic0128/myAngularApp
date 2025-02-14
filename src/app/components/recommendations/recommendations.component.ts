import {Component, OnInit} from '@angular/core';
import {RecommendationService} from "../../services/recommendation.service";
import {Recommendation} from "../../interfaces/recommendation";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: Recommendation[] = [];
  constructor(
    private recommendationService: RecommendationService
  ) {

  }


  ngOnInit(): void {
    this.recommendationService.getAllRecommendations().subscribe(
      (data: Recommendation[]) => {
        this.recommendations=data;
      }
    )
  }
}
