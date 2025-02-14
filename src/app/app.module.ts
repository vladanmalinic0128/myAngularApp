import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from "primeng/button";
import {FintessProgramsComponent} from './components/fintess-programs/fintess-programs.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import {HomeComponent} from './components/home/home.component';
import {AuthService} from "./services/auth.service";
import {ToastModule} from "primeng/toast";
import {CardModule} from 'primeng/card';
import {StyleClassModule} from "primeng/styleclass";
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {CityService} from "./services/city.service";
import {ImageModule} from "primeng/image";
import { MainComponent } from './components/main/main.component';
import {FieldsetModule} from "primeng/fieldset";
import {FitnessProgramsService} from "./services/fitness-programs.service";
import {DataViewModule} from "primeng/dataview";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import { FitnessProgramsFilterComponent } from './components/fitness-programs-filter/fitness-programs-filter.component';
import {InputNumberModule} from "primeng/inputnumber";
import {CategoryService} from "./services/category.service";
import {LocationService} from "./services/location.service";
import { FitnessProgramDetailsComponent } from './components/fitness-program-details/fitness-program-details.component';
import { FitnessProgramWithFilterComponent } from './components/fitness-program-with-filter/fitness-program-with-filter.component';
import {TabMenuModule} from "primeng/tabmenu";
import {BadgeModule} from "primeng/badge";
import {TabViewModule} from "primeng/tabview";
import {GalleriaModule} from "primeng/galleria";
import {TableModule} from "primeng/table";
import { CommentListComponent } from './components/comment-list/comment-list.component';
import {AvatarModule} from "primeng/avatar";
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ParticipateComponent } from './components/participate/participate.component';
import {PaymentTypeService} from "./services/payment-type.service";
import {ParticipationService} from "./services/participation.service";
import {InputMaskModule} from "primeng/inputmask";
import {MegaMenuModule} from "primeng/megamenu";
import {MenubarModule} from "primeng/menubar";
import { AddNewProgramComponent } from './components/add-new-program/add-new-program.component';
import { ListMyProgramsComponent } from './components/list-my-programs/list-my-programs.component';
import { ListExternalProgramsComponent } from './components/list-external-programs/list-external-programs.component';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { ListMessagesComponent } from './components/list-messages/list-messages.component';
import { AddDiaryComponent } from './components/add-diary/add-diary.component';
import { ListDiariesComponent } from './components/list-diaries/list-diaries.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { NewsComponent } from './components/news/news.component';
import { SettingsComponent } from './components/settings/settings.component';
import {SubscriptionService} from "./services/subscription.service";
import {NewsService} from "./services/news.service";
import {TimelineModule} from "primeng/timeline";
import {ChartModule} from "primeng/chart";
import {DiaryService} from "./services/diary.service";
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import {BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import { ListBoughtProgramsComponent } from './components/list-bought-programs/list-bought-programs.component';
import { ListFinishedProgramsComponent } from './components/list-finished-programs/list-finished-programs.component';
import { EditFitnessProgramComponent } from './components/edit-fitness-program/edit-fitness-program.component';
import { ListParticipationsComponent } from './components/list-participations/list-participations.component';


@NgModule({
  declarations: [
    AppComponent,
    FintessProgramsComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    MainComponent,
    FitnessProgramsFilterComponent,
    FitnessProgramDetailsComponent,
    FitnessProgramWithFilterComponent,
    CommentListComponent,
    AddCommentComponent,
    ParticipateComponent,
    AddNewProgramComponent,
    ListMyProgramsComponent,
    ListExternalProgramsComponent,
    AddMessageComponent,
    ListMessagesComponent,
    AddDiaryComponent,
    ListDiariesComponent,
    RecommendationsComponent,
    SubscriptionsComponent,
    NewsComponent,
    SettingsComponent,
    EditPasswordComponent,
    ListBoughtProgramsComponent,
    ListFinishedProgramsComponent,
    EditFitnessProgramComponent,
    ListParticipationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    BrowserAnimationsModule,
    ToastModule,
    CardModule,
    StyleClassModule,
    FileUploadModule,
    HttpClientModule,
    ImageModule,
    FieldsetModule,
    DataViewModule,
    RatingModule,
    TagModule,
    FormsModule,
    InputNumberModule,
    TabMenuModule,
    BadgeModule,
    TabViewModule,
    GalleriaModule,
    TableModule,
    AvatarModule,
    InputMaskModule,
    MegaMenuModule,
    MenubarModule,
    TimelineModule,
    ChartModule,
    BlockUIModule,
    PanelModule
  ],
  providers: [
    AuthService,
    MessageService,
    CityService,
    FitnessProgramsService,
    CategoryService,
    LocationService,
    PaymentTypeService,
    ParticipationService,
    SubscriptionService,
    NewsService,
    DiaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
