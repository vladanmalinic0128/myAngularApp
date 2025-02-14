import {Component, HostListener, OnInit} from '@angular/core';
import {Diary} from "../../interfaces/diary";
import {DiaryService} from "../../services/diary.service";

@Component({
  selector: 'app-list-diaries',
  templateUrl: './list-diaries.component.html',
  styleUrls: ['./list-diaries.component.css']
})
export class ListDiariesComponent implements OnInit {
  diaries: Diary[];
  currentWeightData: any;
  currentWeightOptions: any;
  trainingDurationData: any;
  trainingDurationOptions: any;
  wrapForm: boolean = true;

  constructor(
    private diaryService: DiaryService
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.diaryService.getDiaryRecords().subscribe(
      (data: Diary[]) => {
        this.diaries = data;

        this.currentWeightData = {
          labels: this.diaries.map(d => d.createdAt),
          datasets: [
            {
              label: 'Kilograms',
              data: this.diaries.map(d => d.currentWeight),
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
            }
          ]
        };

        this.trainingDurationData = {
          labels: this.diaries.map(d => d.createdAt),
          datasets: [
            {
              label: 'Duration[mins]',
              data: this.diaries.map(d => d.trainingDuration),
              fill: false,
              borderColor: documentStyle.getPropertyValue('--green-500'),
              tension: 0.4
            }
          ]
        };
      }
    )


    this.currentWeightOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    this.trainingDurationOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.wrapForm = window.innerWidth > 1220;
  }
}
