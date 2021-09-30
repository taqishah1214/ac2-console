import { Component, OnInit } from '@angular/core';
import { CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { CredentialsService } from '@app/core';
import { Router } from '@angular/router';

export class CreateAccountModel {
  id: number;
  tenancyName: string;
  name: string;
  isActive: true;
  accountOwnerUserName: string;
  accountOwnersAddress: string;
  accountOwnersCity: string;
  accountOwnersEmail: string;
  accountOwnersPhone: string;
  accountOwnersState: string;
  accountOwnersZip: string;
  advantageAccountNo: string;
  allowedEmployeeLicenses: 0;
  startDate: Date;
}

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {
  obj: CreateAccountModel;
  errorAdvantageAccount: string;
  errorStartDate: string;
  errorallowedEmployeeLicenses: string;
  constructor(
    public coreService: CoreService,
    private toastr: ToastrService,
    private crendentialService: CredentialsService,
    public router: Router,
    public dialogRef: MatDialogRef<NewAccountComponent>
  ) {}

  ngOnInit() {
    this.obj = new CreateAccountModel();
    this.obj.id = 0;
    this.obj.isActive = true;
  }

  cancel() {
    this.dialogRef.close({ result: null });
  }
  save() {
    var flag = true;
    // this is for validaton checks
    if (!this.obj.name) {
      this.obj.name = '';
      flag = false;
    }
    if (!this.obj.tenancyName) {
      this.obj.tenancyName = '';
      flag = false;
    }
    if (!this.obj.accountOwnerUserName) {
      this.obj.accountOwnerUserName = '';
      flag = false;
    }
    if (!this.obj.accountOwnersAddress) {
      (this.obj.accountOwnersAddress = ''), (flag = false);
    }
    if (!this.obj.accountOwnersCity) {
      this.obj.accountOwnersCity = '';
      flag = false;
    }
    if (!this.obj.accountOwnersEmail) {
      this.obj.accountOwnersEmail = '';
      flag = false;
    }
    if (!this.obj.accountOwnersPhone) {
      this.obj.accountOwnersPhone = '';
      flag = false;
    }
    if (!this.obj.accountOwnersState) {
      this.obj.accountOwnersState = '';
      flag = false;
    }
    if (!this.obj.accountOwnersZip) {
      this.obj.accountOwnersZip = '';
      flag = false;
    }
    if (!this.obj.advantageAccountNo) {
      this.obj.advantageAccountNo = '';
      flag = false;
    }
    if (!this.obj.startDate) {
      this.errorStartDate = '';
      flag = false;
    } else {
      this.errorStartDate = 'no Error';
    }
    if (!this.obj.allowedEmployeeLicenses) {
      this.errorallowedEmployeeLicenses = '';
    } else {
      this.errorallowedEmployeeLicenses = 'no Error';
    }
    if (flag == true) {
      this.coreService.createTenant(this.obj).subscribe(
        res => {
          if (res.success == true) {
            this.toastr.success('Account Added Successfully');
            this.dialogRef.close({ result: 'success' });
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
    } else {
      this.toastr.warning('Required Fields are missing');
    }
  }
}
