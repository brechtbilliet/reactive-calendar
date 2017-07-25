import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../types/appointment.type';
import * as moment from 'moment';
@Component({
    selector: 'day-detail',
    template: `
        <md-card *ngIf="date">
            {{date | date: "dd/MM/yyyy"}}&nbsp;
            <md-card-content>
                <table>
                    <tr *ngFor="let appointment of appointments;" [mdTooltipPosition]="'before'"
                        mdTooltip="{{appointment.description}}">
                        <td (click)="editMode = true">
                            <md-input-container class="example-full-width">
                                <input mdInput [(ngModel)]="appointment.description"
                                       (change)="update(appointment, appointment.$key)">
                            </md-input-container>
                            {{appointment.date | date: "hh:mm"}}
                        </td>
                        <td>
                            <button md-mini-fab color="warn" (click)="removeAppointment.emit(appointment.$key)">
                                <md-icon>delete</md-icon>
                            </button>
                        </td>
                    </tr>
                </table>
            </md-card-content>
            <md-card-actions>
                <button md-button color="primary" class="button-block" (click)="add()">
                    <md-icon>add</md-icon>
                </button>
            </md-card-actions>
        </md-card>
    `
})
export class DayDetailComponent {
    @Input() date: Date;
    @Input() appointments: Array<Appointment>;

    @Output() public addAppointment = new EventEmitter<Date>();
    @Output() public updateAppointment = new EventEmitter<Appointment>();
    @Output() public removeAppointment = new EventEmitter<Appointment>();

    editMode = false;

    add(): void {
        this.addAppointment.emit(moment(this.date).toDate());
    }

    update(appointment: Appointment, $key: string) {
        this.updateAppointment.emit(Object.assign({$key}, appointment));
    }
}