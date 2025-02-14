import {Component, HostListener, OnInit} from '@angular/core';
import {MessageService} from "../../services/message-service.service";
import {MessageCard} from "../../interfaces/message-card";

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit{
  messages: MessageCard[] = [];
  screenWidth: boolean = false;

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (data: MessageCard[]) => {
        this.messages = data;
      }
    );
  }


  toggleSeen(item: MessageCard) {
    this.messageService.updateMessage(item.id).subscribe(
      (data: MessageCard[]) => {
        window.location.reload();
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth > 510;
    console.log(this.screenWidth);
  }
}
