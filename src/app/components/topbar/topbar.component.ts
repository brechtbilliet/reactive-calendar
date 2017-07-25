import { Component, EventEmitter, Output } from '@angular/core';
import { VIEW_MODE } from '../../constants';

@Component({
    selector: 'topbar',
    template: `
        <md-toolbar color="primary">
            <span>Reactive calendar</span>
            <md-toolbar-row>
                <button md-fab (click)="previous.emit()" color="primary">
                    <md-icon>chevron_left</md-icon>
                </button>
                <button md-fab (click)="next.emit()" color="primary">
                    <md-icon>chevron_right</md-icon>
                </button>

                <button md-button (click)="setViewMode.emit(VIEW_MODE.DAY)">Day</button>
                <button md-button (click)="setViewMode.emit(VIEW_MODE.WEEK)">Week</button>
                <button md-button (click)="setViewMode.emit(VIEW_MODE.MONTH)">Month</button>
            </md-toolbar-row>
            <md-toolbar-row>
                <md-input-container flex>
                    <input mdInput (keyup)="searchChanged.emit($event.target.value)"/>
                    <md-icon class="material-icons">&#xE8B6;</md-icon>
                </md-input-container>
            </md-toolbar-row>
        </md-toolbar>
    `,
})
export class TopbarComponent {
    @Output() previous = new EventEmitter();
    @Output() next = new EventEmitter();
    @Output() setViewMode = new EventEmitter<string>();
    @Output() searchChanged = new EventEmitter<string>();

    VIEW_MODE = VIEW_MODE;
}
