import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {HomeComponent} from "./components/home/home.component";
import {MainComponent} from "./components/main/main.component";
import {authGuard} from "./guards/auth.guard";
import {
  FitnessProgramWithFilterComponent
} from "./components/fitness-program-with-filter/fitness-program-with-filter.component";
import {FitnessProgramDetailsComponent} from "./components/fitness-program-details/fitness-program-details.component";
import {NewsComponent} from "./components/news/news.component";
import {AddNewProgramComponent} from "./components/add-new-program/add-new-program.component";
import {ListMyProgramsComponent} from "./components/list-my-programs/list-my-programs.component";
import {ListExternalProgramsComponent} from "./components/list-external-programs/list-external-programs.component";
import {AddMessageComponent} from "./components/add-message/add-message.component";
import {ListMessagesComponent} from "./components/list-messages/list-messages.component";
import {AddDiaryComponent} from "./components/add-diary/add-diary.component";
import {ListDiariesComponent} from "./components/list-diaries/list-diaries.component";
import {RecommendationsComponent} from "./components/recommendations/recommendations.component";
import {SubscriptionsComponent} from "./components/subscriptions/subscriptions.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {EditPasswordComponent} from "./components/edit-password/edit-password.component";
import {ListBoughtProgramsComponent} from "./components/list-bought-programs/list-bought-programs.component";
import {ListFinishedProgramsComponent} from "./components/list-finished-programs/list-finished-programs.component";
import {EditFitnessProgramComponent} from "./components/edit-fitness-program/edit-fitness-program.component";
import {ListParticipationsComponent} from "./components/list-participations/list-participations.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: '', component: FitnessProgramWithFilterComponent},
      {path: 'fitness-programs/:id', component: FitnessProgramDetailsComponent }
    ]
  },
  {path: 'registration', component: RegistrationComponent},
  {path: 'main', component: MainComponent, canActivate: [authGuard], children: [
      {path: '', component: NewsComponent},
      {path: 'add-fitness-program', component: AddNewProgramComponent},
      {path: 'list-participations', component: ListParticipationsComponent},
      {path: 'my-programs', component: ListMyProgramsComponent},
      {path: 'external-programs', component: ListExternalProgramsComponent},
      {path: 'bought-programs', component: ListBoughtProgramsComponent},
      {path: 'finished-programs', component: ListFinishedProgramsComponent},
      {path: 'add-message', component: AddMessageComponent},
      {path: 'messages', component: ListMessagesComponent},
      {path: 'add-diary', component: AddDiaryComponent},
      {path: 'diaries', component: ListDiariesComponent},
      {path: 'recommendations', component: RecommendationsComponent},
      {path: 'subscriptions', component: SubscriptionsComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'edit-password', component: EditPasswordComponent},
      {path: 'edit-fitness-programs/:id', component: EditFitnessProgramComponent },
      {path: 'fitness-programs/:id', component: FitnessProgramDetailsComponent }
  ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
