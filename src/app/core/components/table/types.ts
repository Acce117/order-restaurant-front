import { Pipe, PipeTransform } from "@angular/core";

export interface TableColumn {
    name: string;
    property: string;
    pipe?: PipeTransform
}
export interface Action {
    action: CallableFunction,
    indicator: string;
}