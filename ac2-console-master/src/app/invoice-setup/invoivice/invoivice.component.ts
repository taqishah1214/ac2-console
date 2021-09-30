import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TemplateRendererComponent } from '@app/shared/template-renderer/template-renderer.component';
import { EditInvoiviceComponent } from './edit-invoivice/edit-invoivice.component';
import { NewInvoiviceComponent } from './new-invoivice/new-invoivice.component';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-invoivice',
  templateUrl: './invoivice.component.html',
  styleUrls: ['./invoivice.component.scss']
})
export class InvoiviceComponent implements OnInit {
  @ViewChild('editDeleteCell', { static: true }) editDeleteCell: TemplateRef<
    any
  >;

  Message: string;
  ColumnDef: any;
  rowData: any;
  gridOptions: GridOptions;
  gridApi: any;
  gridColumnApi: any;
  testName: any;
  testType: number;
  outputFormat: number;
  editRow: boolean;
  createTest: any;
  testId: any;
  changedValue: any;
  frameworkComponents: { buttonRenderer: any };
  searchTest: boolean;
  loading: boolean;
  currentPage: number = 1;
  pages: number;
  paginationNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  pageSize: number = 30;
  perPageCount: number = 0;
  count: any;
  dateFrom: Date;
  dateTo: Date;

  tenantData: any;
  constructor(
    public coreService: CoreService,
    private toastr: ToastrService,
    public router: Router,
    private crendentialService: CredentialsService,
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      buttonRenderer: TemplateRendererComponent
    };
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.editRow = false;
    this.testType = 0;
    this.outputFormat = 0;
    this.ColumnDef = [
      { headerName: 'CUSTOMER ID', field: 'customerId' },
      {
        headerName: 'Allowed Employee License',
        field: 'allowedEmployeeLicense'
      },
      { headerName: 'INVOICE TERM NAME', field: 'invoiceTermName' },
      {
        headerName: 'COST PER SEAT',
        field: 'costPerSear',
        valueFormatter: currencyFormatter
      },
      {
        headerName: 'Action',
        colId: 'Action',
        cellRendererFramework: this.frameworkComponents.buttonRenderer,
        cellRendererParams: {
          ngTemplate: this.editDeleteCell
        }
      }
    ];
    this.rowData = [];
    this.setColDef(
      this.ColumnDef,
      this.rowData != [] ? this.rowData : 'No Record found'
    );

    this.currentPage = 1;
    this.pages = 1;
    this.getItems();
    //this.setSerialNumber();
  }
  setColDef(colDef: any, rowData: any) {
    this.gridOptions = {
      onGridReady: this.onGridReady.bind(this),
      columnDefs: colDef,
      rowData: rowData
    };
  }

  onGridReady(params: { api: any; columnApi: any }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.coreService.getInvoiceSchedulers(this.dateFrom, this.dateTo).subscribe(
      data => {
        var dataSource = {
          getRows: function(params: any) {
            setTimeout(function() {
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          }
        };
        params.api.setDatasource(dataSource);
        this.rowData = data.result.items;
        for (var i = 0; i < this.rowData.length; i++) {
          this.rowData[i].serialNo = i + 1;
        }
      },
      err => {
        this.toastr.error(err.error.error.message);
        if (err.error.unAuthorizedRequest == true) {
          this.toastr.error(
            ' Your session has been expired please login again'
          );
          this.crendentialService.remove();
          this.router.navigate(['/login']);
        }
      }
    );
    this.gridOptions.rowHeight = 40;
    this.gridOptions.api.sizeColumnsToFit();
    this.ngOnChanges();
  }
  ngOnChanges() {
    if (this.gridOptions && this.gridApi !== undefined) {
      this.gridOptions.api.setRowData(this.rowData);
      this.gridOptions.api.refreshCells({ force: true });
    }
  }

  search() {
    this.coreService
      .getInvoiceSchedulers(this.dateFrom, this.dateTo)
      .subscribe(res => {
        this.rowData = res.result.items;
        for (var i = 0; i < this.rowData.length; i++) {
          this.rowData[i].serialNo = i + 1;
        }
        this.count = res.result.items.length;
        this.currentPage = res.result.page;
        this.pages = res.result.pages;
        this.perPageCount = res.result.items.length;
        this.gridOptions.api.setRowData(this.rowData);
      });
  }
  page(event: any) {
    this.currentPage = event.number;
    this.getItems();
  }
  editItem(row: any) {
    this.coreService.getInvoiceSchedulerById(row.id).subscribe(
      res => {
        if (res.success == true) {
          const dialogRef = this.dialog.open(EditInvoiviceComponent, {
            data: res.result,
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getItems();
          });
        }
      },
      err => {
        this.toastr.error(err.error.error.message);
        if (err.error.unAuthorizedRequest == true) {
          this.toastr.error(
            ' Your session has been expired please login again'
          );
          this.crendentialService.remove();
          this.router.navigate(['/login']);
        }
      }
    );

    if (this.tenantData != null) {
    } else {
      // Account not Found with this
    }
  }

  getItems() {
    this.loading = true;

    this.coreService
      .getInvoiceSchedulers(this.dateFrom, this.dateFrom)
      .subscribe(
        res => {
          if (res.result) {
            this.loading = false;
            this.rowData = res.result.items;

            for (var i = 0; i < this.rowData.length; i++) {
              this.rowData[i].serialNo = i + 1;
            }
            this.count = res.result.items.length;
            this.currentPage = res.result.page;
            this.pages = res.result.pages;
            this.perPageCount = res.result.items.length;
            this.ngOnChanges();
            if (res.result.items.length <= 0) {
              this.toastr.info('No record found');
            }
          }
        },
        res => {
          this.loading = false;
          if (res.error.unAuthorizedRequest == true) {
            this.toastr.error(
              ' Your session has been expired please login again'
            );
            this.crendentialService.remove();
            this.router.navigate(['/login']);
          }
          this.toastr.error(res.error.error.message);
        }
      );
  }
  addItem(): void {
    var dialog = this.dialog.open(NewInvoiviceComponent, {
      data: 'Edit Invoice'
    });
    dialog.afterClosed().subscribe(res => {
      if (res.result != null) {
        this.getItems();
      }
    });
  }

  deleteItem(row: any) {
    this.coreService.deleteInvoiceScheduler(row.id).subscribe(
      res => {
        if (res.success == true) {
          this.getItems();
          this.toastr.error('Invoice Deleted Successfully');
        }
      },
      err => {
        this.toastr.error(err.error.error.message);
        if (err.error.unAuthorizedRequest == true) {
          this.toastr.error(
            ' Your session has been expired please login again'
          );
          this.crendentialService.remove();
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
function currencyFormatter(params: any) {
  return '$' + params.value.toFixed(2);
}
