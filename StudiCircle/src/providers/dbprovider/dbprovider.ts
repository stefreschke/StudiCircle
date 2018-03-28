import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../api/api';
import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { ApiResponse } from "../declarations/ApiResponse";
import { GeoResponse } from "../declarations/GeoResponse";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Circle } from '../declarations/Circle';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {
  private result: any;

  constructor(public http: HttpClient, private api: ApiProvider) { }

  public getCircles() {
    /*this.http.get('https/api.dev.sknx.de/circle/forUser?id=1').map(res => {
       this.res = res;
       console.log(res);
     });*/
    const successSubject: Subject<boolean> = new Subject<boolean>();
    const subs: Subscription = this.http.get(
      'http://localhost:8080/circle/forUser?id=1').subscribe(
      (res: ApiResponse) => {
        subs.unsubscribe();
        console.log(res);
        successSubject.next(res.httpStatus === 200);
      },
      (error: any) => {
        console.log(error);
        subs.unsubscribe();
        successSubject.next(false);
      }
      );
  }

  public getCirclesByLocation(lat: number, lon: number, distance: number): Observable<Circle[]> {
    console.log(lat, lon, distance);

    const url = `http://localhost:8080/circle/forLocation?loc[lat]=${lat}&loc[lon]=${lon}&dist=${distance}`;
    return this.http.get<Circle[]>(url);
  }

  public setLocation(lat, long) {
    //Jesse mach mal was
  }

  public getLocationByAddress(address: string) {
    const successSubject: Subject<boolean> = new Subject<boolean>();
    const subs: Subscription = this.http.get(
      'https://nominatim.openstreetmap.org/search/$' + address + '?format=json&limit=1').subscribe(
      (res: GeoResponse) => {
        subs.unsubscribe();
        console.log(res);
        successSubject.next(true);
        console.log(res[0].lat, res[0].lon);
        this.setLocation(res[0].lat, res[0].lon);
      },
      (error: any) => {
        console.log(error);
        subs.unsubscribe();
        successSubject.next(false);
      }
      );
  }

}
