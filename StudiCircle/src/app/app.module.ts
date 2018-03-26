import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GetInvolvedPage } from '../pages/get-involved/get-involved';
import { LogInPage } from '../pages/log-in/log-in';
import { VerifyNowPage } from '../pages/verify-now/verify-now';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SettingsPage } from '../pages/settings/settings';
<<<<<<< HEAD
import { PassManPage } from '../pages/pass-man/pass-man';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
=======
import { SearchPage } from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
>>>>>>> f102aa312ffa3395b08cbdd9378270c4a8a329ca

@NgModule({
  declarations: [
    MyApp,
    GetInvolvedPage,
    LogInPage,
    VerifyNowPage,
    DashboardPage,
    SettingsPage,
<<<<<<< HEAD
    PassManPage
=======
    SearchPage
>>>>>>> f102aa312ffa3395b08cbdd9378270c4a8a329ca
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GetInvolvedPage,
    LogInPage,
    VerifyNowPage,
    DashboardPage,
    SettingsPage,
<<<<<<< HEAD
    PassManPage
=======
    SearchPage
>>>>>>> f102aa312ffa3395b08cbdd9378270c4a8a329ca
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
=======
    Geolocation,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> f102aa312ffa3395b08cbdd9378270c4a8a329ca
  ]
})
export class AppModule {}
