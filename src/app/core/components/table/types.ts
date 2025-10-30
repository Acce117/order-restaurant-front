import { Pipe } from "@angular/core";

export interface TableColumn {
    name: string;
    property: string;
    pipe?: Pipe
}
export interface Action {
    action: CallableFunction,
    indicator: string;
}