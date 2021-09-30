import { Component, OnInit } from '@angular/core';
import { InvoiceSchedulerCreator, CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { CredentialsService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-invoivice',
  templateUrl: './new-invoivice.component.html',
  styleUrls: ['./new-invoivice.component.scss']
})
export class NewInvoiviceComponent implements OnInit {
  obj: InvoiceSchedulerCreator = new InvoiceSchedulerCreator();
  companyList: any;
  companySeatList: any;
  invoiceTermList: any;

  errorCompnay: string;
  errorCutomerId: string;
  errorAllowedEmployeeLicences: string;
  errorCostPerSeat: string;
  errorInvoiceTerm: string;
  seat: any;
  constructor(
    public coreService: CoreService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<NewInvoiviceComponent>,
    private crendentialService: CredentialsService,
    public router: Router
  ) {}

  ngOnInit() {
    this.obj.id = 0;
    this.obj.uRLPrice = true;
    this.getCompanyList();
    this.getInvoiceTermList();
    this.GetCompanySeat();
  }
  getCompanyList() {
    this.coreService.getCompanyNameList().subscribe(
      res => {
        if ((res.success = true)) {
          this.companyList = res.result;
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
  GetCompanySeat() {
    this.coreService.GetCompanySeat().subscribe(
      res => {
        if ((res.success = true)) {
          this.companySeatList = res.result;
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
  getInvoiceTermList() {
    this.coreService.getInvoiceTermEnumValuesAndDescriptions().subscribe(
      res => {
        if ((res.success = true)) {
          this.invoiceTermList = res.result;
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
  selectCompany(event: any) {
    this.obj.companyId = event.target.value;
    let obj = this.companySeatList.find(
      (x: { id: any }) => x.id == this.obj.companyId
    );
    if (obj) {
      this.seat = obj.seat;
    }
    this.errorCompnay = 'no error';
  }

  selectInvoiceTerm(event: any) {
    this.obj.invoicingTermEnum = event.target.value;
    this.errorInvoiceTerm = 'no error';
  }

  cancel() {
    this.dialogRef.close({ result: null });
  }

  save() {
    var flag = false;
    if (this.obj.customerId == undefined) {
      this.errorCutomerId = '';
      flag = true;
    }
    if (this.obj.companyId == undefined) {
      this.errorCompnay = '';
      flag = true;
    }
    if (this.obj.costPerSear == undefined) {
      (this.errorCostPerSeat = ''), (flag = true);
    }
    if (this.obj.invoicingTermEnum == undefined) {
      (this.errorInvoiceTerm = ''), (flag = true);
    }
    if (this.obj.allowedEmployeeLicense > this.seat) {
      flag = false;
      this.toastr.error(
        'Allowed employee licenses can not be greater than the account employee licenses'
      );
      return;
    }
    if (flag == false) {
      this.coreService.createInvoiceScheduler(this.obj).subscribe(
        res => {
          if (res.success == true) {
            this.toastr.success('Invoice Scheduler is Added Successfully');
            this.dialogRef.close({ result: 'suceess' });
          }
        },
        err => {
          this.toastr.error(err.error.error.message);
          if (err.error.unAuthorizedRequest) {
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
}
