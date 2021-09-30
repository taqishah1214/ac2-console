import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/core';
import { CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-invoice-payment',
  templateUrl: './edit-invoice-payment.component.html',
  styleUrls: ['./edit-invoice-payment.component.scss']
})
export class EditInvoicePaymentComponent implements OnInit {
  companyList: any;
  invoiceTermList: any;
  companyName: string;
  invoiceTermKey: string;
  invoiceStatusKey: string;
  invoiceStatusList: any;
  constructor(
    public coreService: CoreService,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<EditInvoicePaymentComponent>,
    private crendentialService: CredentialsService,
    public router: Router,

    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {}

  ngOnInit() {
    this.getCompanyList();
    this.getInvoiceTermList();
    this.getInvoiceStatusList();
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
  selectInvoiceStatus(event: any) {
    this.obj.invoiceStatusEnum = event.target.value;
  }

  cancel() {
    this.dialogRef.close({ result: null });
  }

  getInvoiceStatusList() {
    this.coreService.getInvoiceStatusEnumValuesAndDescriptions().subscribe(
      res => {
        if ((res.success = true)) {
          this.invoiceStatusList = res.result;
          this.invoiceStatusKey = res.result.find(
            (x: any) => x.value == this.obj.invoiceStatusEnum
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
  save() {
    this.coreService.updateInvoicePayment(this.obj).subscribe(
      res => {
        if (res.success == true) {
          this.toastr.success('Invoice Payment is Updated Successfully');
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
