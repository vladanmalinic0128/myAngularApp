import {Component, OnInit} from '@angular/core';
import {News} from "../../interfaces/news";
import {NewsService} from "../../services/news.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  elements: News[] = [];

  constructor(
    private newsService: NewsService,
    private messageService: MessageService
  ) {
  }
  // ngOnInit(): void {
  //   this.newsService.getAllRecommendations().subscribe(
  //     (dataPromise: Promise<any>) => {
  //       dataPromise.then((data: any) => {
  //           if(data?.rss?.channel?.item)
  //             this.elements = data.rss.channel.item;
  //           else
  //             this.messageService.add({severity: 'error', summary: 'Error', detail: "Cannot parse xml data"});
  //         }).catch((error: any) => {
  //           this.messageService.add({severity: 'error', summary: 'Error', detail: "Error fetching rss feed"});
  //         })
  //     });
  // }

  ngOnInit(): void {
    this.newsService.getAllRecommendations().toPromise()
      .then((data: any) => {
        if ((Array.isArray(data?.rss?.channel?.item))) {
          this.elements = data.rss.channel.item;
          console.log(this.elements);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Cannot parse xml data" });
        }
      })
      .catch((error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error fetching rss feed" });
      });
  }
}
