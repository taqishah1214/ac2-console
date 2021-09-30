import { Component, OnInit, Inject } from '@angular/core';
import { CoreService } from '@app/core/core.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { boolean } from 'mathjs';
import { CredentialsService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  errorallowedEmployeeLicenses: string;
  errorStartDate: string;
  constructor(
    public coreService: CoreService,
    public toastr: ToastrService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    private crendentialService: CredentialsService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {
    this.obj.startDate = this.datePipe.transform(
      this.obj.startDate,
      'yyyy-MM-dd'
    );
  }

  ngOnInit() {}
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
      this.coreService.updateTenant(this.obj).subscribe(
        res => {
          if (res.success == true) {
            this.dialogRef.close({ result: 'success' });
            this.toastr.success('Account Updated Successfully');
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
