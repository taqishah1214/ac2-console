import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
export class PrimengTableHelper {
  predefinedRecordsCountPerPage = [5, 10, 25, 50, 100, 250, 500];

  defaultRecordsCountPerPage = 50;

  isResponsive = true;

  resizableColumns: true;

  totalRecordsCount = 0;

  records: any[] = [];

  isLoading = false;

  showLoadingIndicator(): void {
    setTimeout(() => {
      this.isLoading = true;
    }, 0);
  }

  hideLoadingIndicator(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  }

  getSorting(table: Table): string {
    let sorting;
    if (table.sortField) {
      sorting = table.sortField;
      if (table.sortOrder === 1) {
        sorting += ' ASC';
      } else if (table.sortOrder === -1) {
        sorting += ' DESC';
      }
    }

    return sorting;
  }
}
