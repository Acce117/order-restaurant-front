import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, input, PipeTransform, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableColumn } from './types';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatButtonModule, NgTemplateOutlet, MatPaginatorModule],
  templateUrl: './table.html',
})
export class Table {
  data = input<any[]>([]);
  actions = input<TemplateRef<any>>();
  @ContentChild(MatPaginator) paginator?: MatPaginator;

  columns = input.required<TableColumn[]>();

  displayedColumns = computed(() => {
    const columns = [
      ...this.columns().map((column) => column.name)
    ];

    if (this.actions()) columns.push('Actions');
    return columns;
  });

  ifPipeTransform(value: any, pipe: PipeTransform | undefined | null) {
    return pipe ? pipe.transform(value) : value;
  }
}
