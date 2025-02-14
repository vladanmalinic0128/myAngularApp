import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "../../services/subscription.service";
import {Subscription} from "../../interfaces/subscription";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit{
  subscriptions: Subscription[];
  constructor(
      private subscriptionService: SubscriptionService
  ) {
  }

  ngOnInit(): void {
    this.subscriptionService.getAllSubscriptions().subscribe(
    (data: Subscription[]) => {
        this.subscriptions = data;
    })
  }


  subscribe(subscription: Subscription) {
    this.subscriptionService.postSubscription(subscription.categoryId, true).subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  unsubscribe(subscription: Subscription) {
    this.subscriptionService.postSubscription(subscription.categoryId, false).subscribe(
      () => {
        window.location.reload();
      }
    );
  }
}
