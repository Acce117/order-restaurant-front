import { Component, effect, model, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { Subscriber, Subscription, switchMap, timer } from "rxjs";

@Component({
    selector: 'search-input',
    template: `
        <mat-form-field>
            <span matSuffix style="padding-right: 10px">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none" />
                    <path fill="currentColor"
                        d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                </svg>
            </span>
            <input matInput type="text" placeholder="enter to search" (input)="searchFn()" [(ngModel)]="searchEntry"/>
        </mat-form-field>
    `,
    imports: [MatInputModule, FormsModule]
})
export class SearchInput {
    searchEntry = model<string>('');

    subscriber: Subscription | null = null;
    
    searchEvent = output({alias: 'search'});
    
    searchFn() {
        if (this.subscriber)
            this.subscriber.unsubscribe();

        this.subscriber = timer(500)
            .subscribe(
                () => this.searchEvent.emit(),
            );
    }
}