import { Component } from '@angular/core';
import { VIEW_MODE } from '../../constants';
import * as moment from 'moment';
import { Appointment } from '../../types/appointment.type';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  template: `
    <topbar
      (next)="onNext()"
      (previous)="onPrevious()"
      (setViewMode)="onSetViewMode($event)"
      (searchChanged)="onSearchChanged($event)">
    </topbar>
    <div [ngSwitch]="null">
      <day-view
        *ngSwitchCase="VIEW_MODE.DAY"
        [appointments]="[]"
        [date]="[]"
        (removeAppointment)="onRemoveAppointment($event)"
        (addAppointment)="onAddAppointment($event)"
        (updateAppointment)="onUpdateAppointment($event)"
      >
      </day-view>
      <week-view
        *ngSwitchCase="VIEW_MODE.WEEK"
        [appointments]="[]"
        [year]="[]"
        [week]="[]"
        (removeAppointment)="onRemoveAppointment($event)"
        (addAppointment)="onAddAppointment($event)"
        (updateAppointment)="onUpdateAppointment($event)"
      >
      </week-view>
      <month-view
        *ngSwitchCase="VIEW_MODE.MONTH"
        [month]="[]"
        [year]="[]"
        [appointments]="[]"
        (removeAppointment)="onRemoveAppointment($event)"
        (addAppointment)="onAddAppointment($event)"
        (updateAppointment)="onUpdateAppointment($event)"
      >
      </month-view>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  VIEW_MODE = VIEW_MODE;

  constructor(private db: AngularFireDatabase) {
  }

  private filterByTerm(appointment: Appointment, term: string): boolean {
    return appointment.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
  }

  onSetViewMode(viewMode: string): void {
  }

  onPrevious(): void {
  }

  onNext(): void {
  }

  onSearchChanged(e: string): void {
  }

  onRemoveAppointment(id: string): void {
  }

  onAddAppointment(date: Date): void {
  }

  onUpdateAppointment(appointment: Appointment): void {
    this.db.object('appointments/' + appointment.$key).set({
      description: appointment.description,
      date: appointment.date
    });
  }
}
