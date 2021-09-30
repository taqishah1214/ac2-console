import { Component, OnInit, Inject } from '@angular/core';
import { CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CredentialsService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-invoivice',
  templateUrl: './edit-invoivice.component.html',
  styleUrls: ['./edit-invoivice.component.scss']
})
export class EditInvoiviceComponent implements OnInit {
  companyList: any;
  invoiceTermList: any;
  companyName: string;
  invoiceTermKey: string;
  companySeatList: any;
  seat: any;
  constructor(
    public coreService: CoreService,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<EditInvoiviceComponent>,
    private crendentialService: CredentialsService,
    public router: Router,

    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {}

  ngOnInit() {
    this.getCompanyList();
    this.getInvoiceTermList();
    this.GetCompanySeat();
  }
  getCompanyList() {
    this.coreService.getCompanyNameList().subscribe(
      res => {
        if ((res.success = true)) {
          this.companyList = res.result;

          this.companyName = res.result.find(
            (x: any) => x.id == this.obj.companyId
          ).name;
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
          this.invoiceTermKey = res.result.find(
            (x: any) => x.value == this.obj.invoicingTermEnum
          ).key;
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
  }

  selectInvoiceTerm(event: any) {
    this.obj.invoicingTermEnum = event.target.value;
  }

  cancel() {
    this.dialogRef.close({ result: null });
  }

  save() {
    let obj = this.companySeatList.find(
      (x: { id: any }) => x.id == this.obj.companyId
    );
    if (obj) {
      this.seat = obj.seat;
    }
    if (this.obj.allowedEmployeeLicense > this.seat) {
      this.toastr.error('Employee can not greater  than acount employee');
      return;
    }
    this.coreService.updateInvoiceScheduler(this.obj).subscribe(
      res => {
        if (res.success == true) {
          this.toastr.success('Invoice Scheduler is Updated Successfully');
          this.dialogRef.close({ result: 'suceess' });
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
