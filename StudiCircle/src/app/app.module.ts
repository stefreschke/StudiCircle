import {ErrorHandler, NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {GetInvolvedPage} from '../pages/get-involved/get-involved';
import {LogInPage} from '../pages/log-in/log-in';
import {VerifyNowPage} from '../pages/verify-now/verify-now';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {CircleErstellenPage} from '../pages/circle-erstellen/circle-erstellen';
import {SettingsPage} from '../pages/settings/settings';
import {PassManPage} from '../pages/pass-man/pass-man';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ApiProvider} from '../providers/api/api';
import {CircleStartseite} from "../pages/circle-startseite/circle-startseite";
import {MitgliederÜbersicht} from "../pages/mitglieder-übersicht/mitglieder-übersicht";
import {CircleProvider} from "../providers/circle-provider/CircleProvider";
import {Geolocation} from '@ionic-native/geolocation';
import {DbProvider} from '../providers/dbprovider/dbprovider';
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {ChangeMailPage} from "../pages/change-mail/change-mail";
import {SearchPage} from "../pages/search/search";
import {CircleEinstellungenPage} from "../pages/circle-einstellungen/circle-einstellungen";
import {BlackboardPage} from "../pages/blackboard/blackboard";
import {BlackboardPostPage} from '../pages/blackboard-post/blackboard-post';
import {constants} from "../consts/constants";
import {AdminAuswaehlenPage} from "../pages/admin-wählen/admin-auswählen";
import {ChatPage} from "../pages/chat/chat";
import {EmojiProvider} from "../providers/emoji-provider/emoji";
import {RelativeTime} from "../pipes/relative-time";
import {EmojiPickerComponent} from "../components/emoji-picker";
import {ChatProvider} from "../providers/chat/ChatProvider";
import {PopoverPage} from "../pages/circle-startseite/circle-startseite";
import {ToastyProvider} from "../providers/toasty/toasty";
import {FAQPage} from "../pages/faq/faq";
import {CalendarPage} from "../pages/calendar/calendar";
import {ImpressumPage} from "../pages/impressum/impressum";
import {EventModalPage} from "../pages/event-modal/event-modal";
import {CalendarTabPage} from "../pages/calendar-tab/calendar-tab";
import {TimelinePage, Timeline} from "../pages/timeline/timeline";
import {PopoverTimelinePage} from "../pages/popover-timeline/popover-timeline";
import {DatePickerModule} from "ionic2-date-picker";
import {StrictRelativeTime} from "../pipes/strict-relative-time";
import {CalendarModule} from "ion2-calendar";
import {CalendarProvider} from "../providers/calendar/CalendarProvider";
import {VoteListPage} from "../pages/vote-list/vote-list";
import {WipPage} from "../pages/wip/wip";

@NgModule({
  declarations: [
    MyApp,
    GetInvolvedPage,
    LogInPage,
    VerifyNowPage,
    DashboardPage,
    CircleErstellenPage,
    SettingsPage,
    PassManPage,
    CircleStartseite,
    SearchPage,
    ForgotPasswordPage,
    ChangeMailPage,
    MitgliederÜbersicht,
    SearchPage,
    CircleEinstellungenPage,
    RelativeTime,
    AdminAuswaehlenPage,
    EmojiPickerComponent,
    ChatPage,
    PopoverPage,
    BlackboardPage,
    BlackboardPostPage,
    FAQPage,
    CalendarPage,
    ImpressumPage,
    EventModalPage,
    CalendarTabPage,
    TimelinePage,
    PopoverTimelinePage,
    StrictRelativeTime,
    Timeline,
    VoteListPage,
    WipPage
  ],

  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(EmojiPickerComponent),
    DatePickerModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GetInvolvedPage,
    LogInPage,
    VerifyNowPage,
    DashboardPage,
    CircleErstellenPage,
    SettingsPage,
    PassManPage,
    SearchPage,
    ChangeMailPage,
    ForgotPasswordPage,
    CircleStartseite,
    MitgliederÜbersicht,
    SearchPage,
    CircleEinstellungenPage,
    ChatPage,
    PopoverPage,
    AdminAuswaehlenPage,
    CalendarPage,
    EventModalPage,
    CalendarTabPage,
    BlackboardPage,
    BlackboardPostPage,
    FAQPage,
    TimelinePage,
    ImpressumPage,
    PopoverTimelinePage,
    Timeline,
    VoteListPage,
    WipPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    CircleProvider,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider,
    HttpModule,
    HttpClientModule,
    constants,
    EmojiProvider,
    ChatProvider,
    ToastyProvider,
    CalendarProvider
  ]
})
export class AppModule {}
