import {CalendarPage} from "../calendar/calendar";
import {Component} from "@angular/core";
import {TimelinePage, AppointmentCard} from "../timeline/timeline";

@Component({
  selector: 'page-calendar-tab',
  templateUrl: 'calendar-tab.html',
})
export class CalendarTabPage {

  appointments: AppointmentCard[] = [
    {appointment: {id: 1, title: 'Basketball', description: 'Tolles Event', location: 'Mannheim', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-13T19:40:37.049Z' ,countCommits: 12,countRejections: 2, countInterested: 7},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-15T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-14T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-18T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'},
    {appointment: {id: 1, title: 'Basketball', description: 'Tolles Event', location: 'Mannheim', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-14T18:40:37.049Z' ,countCommits: 12,countRejections: 2, countInterested: 7},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-15T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-14T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'},
    {appointment: {id: 2, title: 'Fußball', description: 'Beste Sport wo gibbet', location: 'Borussia-Park', startDate: '2018-04-13T18:40:37.049Z',
      endDate: '2018-04-19T19:40:37.049Z' ,countCommits: 42,countRejections: 12, countInterested: 27},vote:'none'}];

  calendarPage = CalendarPage;
  timelinePage = TimelinePage;
  params = {appointmentList: this.appointments};
}
