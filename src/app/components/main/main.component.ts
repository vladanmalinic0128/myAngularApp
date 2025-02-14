import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {DiaryService} from "../../services/diary.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private diaryService: DiaryService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Fitness programs',
        icon: 'pi pi-fw pi-shopping-bag',
        items: [
          {
            label: 'My programs',
            icon: 'pi pi-fw pi-home',
            items: [
              {
                label: 'Add new program',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                  this.router.navigate(['/main/add-fitness-program']);
                }
              },
              {
                label: 'See active programs',
                icon: 'pi pi-fw pi-check-circle',
                command: () => {
                  this.router.navigate(['/main/my-programs']);
                }
              },
              {
                label: 'See finished programs',
                icon: 'pi pi-fw pi-flag-fill',
                command: () => {
                  this.router.navigate(['/main/finished-programs']);
                }
              }
            ]
          },
          {
            label: 'Bought programs',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
              this.router.navigate(['/main/bought-programs']);
            }
          },
          {
            label: 'External programs',
            icon: 'pi pi-fw pi-globe',
            command: () => {
              this.router.navigate(['/main/external-programs']);
            }
          },
          {
            label: 'List Actions',
            icon: 'pi pi-fw pi-history',
            command: () => {
              this.router.navigate(['/main/list-participations']);
            }
          }
        ]
      },
      {
        label: 'Diary',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Create new record',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
              this.router.navigate(['/main/add-diary']);
            }
          },
          {
            label: 'See diary',
            icon: 'pi pi-fw pi-chart-bar',
            command: () => {
              this.router.navigate(['/main/diaries']);
            }
          },
          {
            label: 'Download pdf',
            icon: 'pi pi-fw pi-download',
            command: () => {
              this.diaryService.downloadPdf();
            }
          }
        ]
      },
      {
        label: 'Chat',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'New message',
            icon: 'pi pi-fw pi-comment',
            command: () => {
              this.router.navigate(['/main/add-message']);
            }
          },
          {
            label: 'See messages',
            icon: 'pi pi-fw pi-comments',
            command: () => {
              this.router.navigate(['/main/messages']);
            }
          }
        ]
      },
      {
        label: 'Subscription',
        icon: 'pi pi-fw pi-map',
        command: () => {
          this.router.navigate(['/main/subscriptions']);
        }
      },
      {
        label: 'Recommendations',
        icon: 'pi pi-fw pi-thumbs-up',
        command: () => {
          this.router.navigate(['/main/recommendations']);
        }
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-wrench',
        items: [
          {
            label: 'Edit data',
            icon: 'pi pi-fw pi-cog',
            command: () => {
              this.router.navigate(['/main/settings']);
            }
          },
          {
            label: 'Edit password',
            icon: 'pi pi-fw pi-key',
            command: () => {
              this.router.navigate(['/main/edit-password']);
            }
          }
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  async logout() {
    sessionStorage.clear();
    await this.router.navigate(['/home']);
  }
}
