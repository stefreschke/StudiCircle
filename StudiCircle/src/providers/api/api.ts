import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../providers/declarations/UserInfo';
import {Subscription} from "rxjs/Subscription";
import {map} from "rxjs/operators/map";
import {Subject} from "rxjs/Subject";
import {ApiResponse} from "../declarations/ApiResponse";
import {AccountTypes} from "../declarations/AccountTypeEnum";
import {LoginResponse} from "../declarations/LoginResponse";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private _apiPath = "https://api.dev.sknx.de/";
  public currentUser: UserInfo;

  constructor(private http: HttpClient) {

  }

  public changeMail(new_mail : string, pwd : string){
    let data = {"session" : this.currentUser.session, "oldMail" : this.currentUser.username, "newMail" : new_mail, "pass" : pwd}
    let header = { "headers": {"Content-Type": "application/json"} };
    return this.http.post(
      this._apiPath + "user/updateMail",
      data,
      header
    ).pipe(
      map(
        (res: ApiResponse) => {
          if(res.httpStatus !== 200) {
            return false;
          } else {
            this.currentUser.username = new_mail;
            return true;
          }
        }
      )
    );
  }

  public login(username: string, password: string): Observable<boolean>{
    let userCredentials = {"mail": username, "pwd": password};
    var header = { "headers": {"Content-Type": "application/json"} };
    return this.http.post(
      this._apiPath + "user/login",
      userCredentials,
      header
    ).pipe(
      map(
        (res: LoginResponse) => {
          if(res.status !== 200) {
            return false;
          } else {
            res.userData.session = res.session;
            this.currentUser = res.userData;
            return true;
          }
        }
      )
    );
  }

  public register(mail : string, name : string, passwd : string, type : string){
    const successSubject: Subject<boolean> = new Subject<boolean>();
    let typeAsInt : number;
    if(type == 'student'){
      typeAsInt = AccountTypes.STUDENT;
    }else{
      if(type == 'business'){
        typeAsInt = AccountTypes.BUSINESS;
      }else{
        typeAsInt = AccountTypes.STUDENT;
      }
    }

    var data = JSON.stringify({
      "mail": mail,
      "username" : name,
      "pwd": passwd,
      "type": typeAsInt
    });

    var header = { "headers": {"Content-Type": "application/json"} };

    const registerNewUser: Subscription = this.http.post(
      this._apiPath + "user/register",
      data,
      header
    ).subscribe(
      (res: ApiResponse) => {
        registerNewUser.unsubscribe();
        successSubject.next(res.httpStatus === 200);
      },
      (error: any) => {
        console.log(error);
        registerNewUser.unsubscribe();
        successSubject.next(false);
      }
    );
    return successSubject.asObservable();
  }
}
