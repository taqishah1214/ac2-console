import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreService, TenantFull } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';
import { PaginationComponent } from '@app/shared/pagination/pagination.component';

@Component({
  selector: 'app-email-logs',
  templateUrl: './email-logs.component.html',
  styleUrls: ['./email-logs.component.scss']
})
export class EmailLogsComponent implements OnInit {
  @ViewChild('pageComp', { static: true }) pageComp: PaginationComponent;
  currentPage: number = 1;
  pages: number;
  changedValue: any;
  paginationNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  pageSize: number = 30;
  perPageCount: number = 0;
  selectedReportId: any;
  endDate: any;
  startDate: any;
  tenantsList: Array<TenantFull>;
  selectedTenant: number;
  count: any;
  emails: any[] = [];
  emailTypeList: any[] = [
    { id: 1, name: 'Auto Submitted Email' },
    { id: 2, name: 'Manual Submitted Email' },
    { id: 3, name: 'Escalation Submitted Email' }
  ];
  selectedEmailId: number;
  reports: any;
  constructor(
    private coreService: CoreService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.pageComp = new PaginationComponent();
    this.startDate = new Date();
    this.endDate = moment(new Date())
      .subtract(29, 'days')
      .toDate();
    this.currentPage = 1;
    this.pages = 1;
    this.getAllTenants();
    this.getReportTypes();
  }

  getAllTenants() {
    this.coreService.getTenants('', 1, 0).subscribe(res => {
      this.tenantsList = res.result.items;
    });
  }
  getReportTypes() {
    this.coreService.GetReportTypesForEmailLog().subscribe(
      res => {
        this.reports = res.result;
      },
      res => {
        this.toastr.error(res.error.error.message);
      }
    );
  }
  getEmails() {
    if (this.selectedTenant && this.selectedReportId && this.selectedEmailId) {
      this.coreService
        .getPagedEmailLog(
          this.currentPage,
          this.pageSize,
          this.selectedTenant,
          this.selectedReportId,
          this.selectedEmailId
        )
        .subscribe(
          res => {
            this.emails = res.result.items;
            this.pages = res.result.pages;
            if (this.emails.length <= 0) {
              this.toastr.info('No Emails found');
            }
          },
          res => {
            this.toastr.error(res.error.error.message);
          }
        );
    } else if (!this.selectedTenant) {
      this.toastr.error('Please Select Any Tenant');
    } else if (!this.selectedEmailId) {
      this.toastr.error('Please Select Email Type');
    } else if (!this.selectedReportId) {
      this.toastr.error('Please Select Report Type');
    }
  }
  onSearchChange(event: { target: { value: any } }): void {
    this.changedValue = event.target.value;

    this.coreService
      .FilterEmailLogList(this.changedValue, this.selectedTenant, this.pageSize)
      .subscribe(
        res => {
          this.emails = res.result.items;
          this.currentPage = res.result.page;
          this.pages = res.result.pages;
          this.perPageCount = res.result.perPage;
          this.count = res.result.items.length;
        },
        err => {
          if (err.error.unAuthorizedRequest == true) {
            this.toastr.error(
              ' Your session has been expired please login again'
            );
          }
        }
      );
    this.pageComp.currentPageChange();
  }

  dateFormate(date: Date) {
    return this.datePipe.transform(date, 'MM,dd,yyyy');
  }
  apply() {
    let startDate = this.dateFormate(this.startDate);
    let endDate = this.dateFormate(this.endDate);

    if (
      this.selectedReportId &&
      this.selectedEmailId &&
      this.selectedTenant &&
      startDate != null &&
      endDate != null
    ) {
      this.coreService
        .getEmailLogs(
          startDate,
          endDate,
          this.selectedTenant,
          this.selectedReportId,
          this.selectedEmailId,
          this.pageSize
        )
        .subscribe(
          res => {
            this.emails = res.result.items;
            this.currentPage = res.result.page;
            this.pages = res.result.pages;
            this.count = res.result.rows;
            this.perPageCount = res.result.perPage;
            if (this.emails.length <= 0) {
              this.toastr.info('No Email found');
            }
          },
          err => {
            this.toastr.error('An Error Occured');
          }
        );
    } else if (!this.selectedTenant) {
      this.toastr.error('Please Select Tenant First');
    } else if (startDate == null || endDate == null) {
      this.toastr.error('Please Select Starting and Ending Date');
    } else if (this.selectedEmailId == undefined) {
      this.toastr.error('Please Select Email Type');
    } else if (this.selectedReportId == undefined) {
      this.toastr.error('Please Select Report Type');
    }
  }
  page(event: any) {
    this.currentPage = event.number;
    this.getEmails();
  }
}
