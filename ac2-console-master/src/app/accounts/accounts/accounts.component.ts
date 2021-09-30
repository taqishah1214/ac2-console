import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NewAccountComponent } from './new-account/new-account.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { GridOptions } from 'ag-grid-community';
import { CoreService } from '@app/core/core.service';
import { Router } from '@angular/router';
import { TemplateRendererComponent } from '@app/shared/template-renderer/template-renderer.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AuthenticationService, CredentialsService } from '@app/core';
import * as moment from 'moment';
import { PaginationComponent } from '@app/shared/pagination/pagination.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @ViewChild('editDeleteCell', { static: true }) editDeleteCell: TemplateRef<
    any
  >;
  @ViewChild('pageComp', { static: true }) pageComp: PaginationComponent;
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
  uperlimit: boolean = false;
  lowerLimit: boolean = false;
  count: any;
  perPageCount: number = 0;
  pageSize: number = 30;
  tenantData: any;
  constructor(
    public coreService: CoreService,
    private toastr: ToastrService,
    public router: Router,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private crendentialService: CredentialsService
  ) {
    this.frameworkComponents = {
      buttonRenderer: TemplateRendererComponent
    };
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.pageComp = new PaginationComponent();
    this.editRow = false;
    this.testType = 0;
    this.outputFormat = 0;
    this.ColumnDef = [
      {
        headerName: 'Serial No',
        field: 'serialNo',
        sortable: true
      },
      {
        headerName: 'Created On',
        field: 'createdOn',
        cellRenderer: (data: { datetime: moment.MomentInput }) => {
          return moment(data.datetime).format('MM/DD/YYYY');
        }
      },
      { headerName: 'Co. Name', field: 'tenancyName' },
      { headerName: 'Active Seats', field: 'activeSeats' },
      { headerName: 'Allowed Licenses', field: 'allowedEmployeeLicenses' },
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
  page(event: any) {
    this.currentPage = event.number;
    this.getItems();
  }
  onGridReady(params: { api: any; columnApi: any }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.coreService.getTenants('', this.currentPage, this.pageSize).subscribe(
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
        //this.setSerialNumber();
      },
      err => {
        if (err.error.unAuthorizedRequest == true) {
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
  onSearchChange(event: { target: { value: any } }): void {
    this.changedValue = event.target.value;
    this.coreService
      .getTenants(this.changedValue, 1, this.pageSize)
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
        this.pageComp.currentPageChange();
      });
  }

  setSerialNumber() {
    for (var i = 0; i < this.rowData.length; i++) {
      this.rowData[i].serialNo = i + 1;
    }
  }

  editItem(row: any) {
    this.coreService.getTenantById(row.id).subscribe(
      res => {
        if (res.success == true) {
          const dialogRef = this.dialog.open(EditAccountComponent, {
            data: res.result,
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
            // $('#searchValue').val('');
            this.getItems();
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

  getItems() {
    this.loading = true;
    this.coreService.getTenants('', this.currentPage, this.pageSize).subscribe(
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
      }
    );
  }
  addItem(): void {
    var dialog = this.dialog.open(NewAccountComponent, {
      data: 'Add New Account'
    });
    dialog.afterClosed().subscribe(res => {
      if (res.result != null) {
        this.getItems();
      }
    });
  }

  loginItem(row: any) {
    this.coreService.impersonation(row.id).subscribe(
      res => {
        let targetUrl =
          res.result.tenantUrl +
          '/' +
          'impersonation/' +
          res.result.impersonationToken +
          '/' +
          row.id;
        window.open(targetUrl);
      },
      err => {
        this.toastr.error(err.error.error.message);
      }
    );
  }

  // pageNumber(num: number) {
  //   this.currentPage = num;
  //   this.getItems();
  // }
}
