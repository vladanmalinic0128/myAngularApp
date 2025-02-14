import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {UserChat} from "../../interfaces/user-chat";
import {UserChatItem} from "../../interfaces/user-chat-item";
import {MessageService} from "../../services/message-service.service";
import {Message} from "../../interfaces/message";
import {MessageService as PrimengMessageService} from "primeng/api";

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  users: any;
  message: any;
  selectedUser = null;
  messageValue = '';

  messageForm = this.fb.group({
    selectedUser: [this.selectedUser, Validators.required],
    message: [this.messageValue, Validators.required]
  });


  submitMessage() {
    const postData = {...this.messageForm.value};
    this.messageService.addMessage({
      id: postData.selectedUser,
      message: postData.message
    } as Message).subscribe(
      (data) => {
        this.primengMessageService.add({severity: 'success', summary: 'Success', detail: 'Message sent'});
      },
      (err) => {
        this.primengMessageService.add({severity: 'error', summary: 'Error', detail: err.error});
      }
    );
    this.messageForm.reset();
  }

  checkValidity() {
    return true;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private primengMessageService: PrimengMessageService
  ) {

  }

  get selectedUsersControl() {
    return this.messageForm.controls['selectedUser'];
  }

  get messageControl() {
    return this.messageForm.controls['message'];
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: UserChat) => {
        this.mapUsers(data);
      }
    );

  }

  private mapUsers(data: UserChat) {
    const result = [];

    const advisors = {
      label: 'Advisors',
      items: data.advisors.map((advisor: UserChatItem) => ({ label: advisor.name, value: advisor.id }))
    };
    result.push(advisors);

    const users = {
      label: 'Users',
      items: data.users.map((user: UserChatItem) => ({ label: user.name, value: user.id }))
    }
    result.push(users);

    this.users = result;
  }
}
