import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { CoreService } from '@app/core/core.service';
import { ConfirmationDialogService } from '@app/shared/confirmation-dialog/confirmation-dialog.service';
import { PaginationComponent } from '@app/shared/pagination/pagination.component';
import { TemplateRendererComponent } from '@app/shared/template-renderer/template-renderer.component';
import { GridOptions } from 'ag-grid-community';
import { forEach } from 'mathjs';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EditInvoicePaymentComponent } from './edit-invoice-payment/edit-invoice-payment.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @ViewChild('editDeleteCell', { static: true }) editDeleteCell: TemplateRef<
    any
  >;
  @ViewChild('pageComponent', { static: true })
  pageComponent: PaginationComponent;
  invoiceStatusKey: number;
  invoiceStatusList: any;
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
  currentPage: number;
  pages: number;
  paginationNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  count: any;
  pageSize: number = 30;
  perPageCount: number = 0;
  dateFrom: Date;
  dateTo: Date;
  tenantData: any;
  constructor(
    public coreService: CoreService,
    private toastr: ToastrService,
    public router: Router,
    public dialog: MatDialog,
    public confirmationDialogService: ConfirmationDialogService,
    private crendentialService: CredentialsService
  ) {
    this.frameworkComponents = {
      buttonRenderer: TemplateRendererComponent
    };
  }

  ngOnInit() {
    this.currentPage = 1;
    this.pageComponent = new PaginationComponent();
    window.scrollTo(0, 0);
    this.testType = 0;
    this.outputFormat = 0;
    this.ColumnDef = [
      {
        headerName: 'Date',
        field: 'date',
        cellRenderer: (params: any) => {
          return moment(params.value).format('MM/DD/YYYY');
        }
      },
      { headerName: 'CUSTOMER ID', field: 'customerId' },
      {
        headerName: 'Type',
        field: 'invoiceTermName'
      },
      { headerName: 'Status', field: 'invoiceStatusName' },
      { headerName: 'Invoice #', field: 'invoiceNumber' },
      { headerName: 'Description', field: 'descripton' },
      {
        headerName: 'Amount',
        field: 'amount',
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
    this.getInvoices(this.currentPage);
    this.getInvoiceStatusList();
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
      },
      err => {
        this.toastr.error(err.error.error.message);
        if (err.error.unAuthorizedRequest == true) {
          this.toastr.error(
            ' Your session has been expired please login again'
          );
        }
      }
    );
    this.gridOptions.rowHeight = 40;
    this.gridOptions.api.sizeColumnsToFit();
    this.ngOnChanges();
  }
  ngOnChanges() {
    if (
      this.gridOptions &&
      this.gridApi !== undefined &&
      this.gridApi != null
    ) {
      this.gridOptions.api.setRowData(this.rowData);
      this.gridOptions.api.refreshCells({ force: true });
    }
  }
  search() {
    this.coreService
      .getInvoiceList(this.dateFrom, this.dateTo, 1, this.pageSize)
      .subscribe(res => {
        this.rowData = res.result.items;
        this.count = res.result.items.length;
        this.currentPage = res.result.page;
        this.pages = res.result.pages;
        this.perPageCount = res.result.items.length;
        this.gridOptions.api.setRowData(this.rowData);
      });
    this.pageComponent = new PaginationComponent();
  }

  getAllInvoices() {
    this.coreService
      .getAllInvoices(this.currentPage, this.pageSize)
      .subscribe(res => {
        this.rowData = res.result.items;
        this.count = res.result.items.length;
        this.currentPage = res.result.page;
        this.pages = res.result.pages;
        this.perPageCount = res.result.items.length;
        this.gridOptions.api.setRowData(this.rowData);
      });
  }
  generatePdf(row: any) {
    this.coreService.GenerateInvoiceReportPdf(row).subscribe(
      res => {
        if (res.result) {
          this.toastr.success('Report Has been sent to your Email');
        } else {
          this.toastr.error('Report Has not been sent');
        }
      },
      res => {
        this.toastr.error(res.error.error.message);
        this.loading = false;
        if (res.error.unAuthorizedRequest == true) {
          this.toastr.error(
            ' Your session has been expired please login again'
          );
          this.crendentialService.remove();
          this.router.navigate(['/login']);
        }
      }
    );
  }

  getInvoices(currentPage: number) {
    this.loading = true;
    this.coreService
      .getInvoiceList(this.dateFrom, this.dateTo, currentPage, this.pageSize)
      .subscribe(
        res => {
          if (res.result) {
            this.loading = false;
            this.rowData = res.result.items;
            this.count = res.result.items.length;
            this.currentPage = res.result.page;
            this.pages = res.result.pages;
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
  editItem(row: any) {
    this.coreService.getInvoiceById(row.id).subscribe(
      res => {
        if (res.success == true) {
          const dialogRef = this.dialog.open(EditInvoicePaymentComponent, {
            data: res.result,
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
            this.getInvoices(this.currentPage);
          });
        }
      },
      err => {
        this.toastr.error(err.error.error.message);
        this.loading = false;
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

  getInvoiceStatusList() {
    this.coreService.getInvoiceStatusEnumValuesAndDescriptions().subscribe(
      res => {
        if ((res.success = true)) {
          this.invoiceStatusList = res.result;
          this.invoiceStatusKey = res.result.find(
            (x: any) => x.key == 'Paid'
          ).value;
        }
      },
      err => {
        this.toastr.error(err.error.error.message);
        this.loading = false;
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
  markAsPaid(row: any) {
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to Paid ?')
      .then(confirmed => {
        if (confirmed) {
          const obj = {
            Id: row.id,
            InvoiceStatusEnum: this.invoiceStatusKey
          };
          this.coreService.updateInvoiceStatus(obj).subscribe(
            res => {
              if (res.success == true) {
                this.toastr.success('Invoice Status Updated Successfully');
                this.getInvoices(this.currentPage);
              }
            },
            err => {
              this.toastr.error(err.error.error.message);
              this.loading = false;
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
      });
  }
  page(event: any) {
    this.currentPage = event.number;
    this.getInvoices(this.currentPage);
    this.pageComponent.currentPageChange();
  }
}

function currencyFormatter(params: any) {
  return '$' + params.value.toFixed(2);
}
