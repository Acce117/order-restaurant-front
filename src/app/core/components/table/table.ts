import { Component, computed, ContentChild, input, output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableColumn } from './types';
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatButtonModule, NgTemplateOutlet, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  data = input.required<any[]>();
  actions = input<TemplateRef<any>>();
  @ContentChild(MatPaginator) paginator?: MatPaginator;

  columns = input.required<TableColumn[]>();

  displayedColumns = computed(() => {
    const columns = [
      ...this.columns().map((column) => column.name),
    ];

    if (this.actions()) columns.push('Actions');
    return columns;
  });
}
