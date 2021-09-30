import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http/http.service';
import { ImpersonationOutput } from './model/impersonation/impersonation.model';
import { ResponseType } from './model/responseType.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor() {}
  post(obj: { [x: string]: string }, url: string) {
    var mapForm = document.createElement('form');
    mapForm.target = '_blank';
    mapForm.method = 'post'; // or "post" if appropriate
    mapForm.action = url;
    Object.keys(obj).forEach(function(param) {
      var mapInput = document.createElement('input');
      mapInput.type = 'hidden';
      mapInput.name = param;
      mapInput.setAttribute('value', obj[param]);
      mapForm.appendChild(mapInput);
    });
    document.body.appendChild(mapForm);
    mapForm.submit();
  }
}

export class InvoiceSchedulerCreator {
  id: number;
  companyId: number;
  customerId: string;
  invoiceNumber: number;
  allowedEmployeeLicense: number;
  costPerSear: number;
  invoicingTermEnum: number;
  uRLPrice: boolean;
}

export class TenantFull {
  id: number;
  serialNo: number;
  createdOn: string;
  tenancyName: string;
  activeSeats: number;
  allowedEmployeeLicenses: number;
}

export class CoreService {
  subUrlType: string;
  show(
    arg0: string,
    arg1: {
      classname: string;
      delay: number;
      autohide: boolean;
      headertext: string;
    }
  ) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public http: HttpClient,
    public httpService: HttpService,
    public router: Router
  ) {}

  getHttpHeader(): HttpHeaders {
    var check = JSON.parse(localStorage.getItem('credentials'));
    if (check) {
      return new HttpHeaders({
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('credentials')).token
      });
    }
    // else
    // {
    //   this.router.navigate(['/login']);
    // }
  }

  loginUser(obj: any) {
    const url = '/api/TokenAuth/Authenticate';
    return this.http.post(url, obj);
  }

  // Tenant Services Start
  createTenant(obj: any): Observable<any> {
    const url = '/api/services/app/Tenant/Create';
    return this.httpService.post(url, obj, {
      headers: this.getHttpHeader()
    });
  }

  updateTenant(obj: any): Observable<any> {
    const url = '/api/services/app/Tenant/Modify';
    return this.httpService.put(url, obj, {
      headers: this.getHttpHeader()
    });
  }

  getTenantById(id: number): Observable<any> {
    const url = '/api/services/app/Tenant/FindById?id=' + id;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }

  impersonation(id: number): Observable<ResponseType<ImpersonationOutput>> {
    const url =
      '/api/services/app/Account/generateImpersonationToken?tenantId=' + id;
    return this.httpService.request('post', url, {
      headers: this.getHttpHeader()
    });
  }
  getLastLoginDate(): Observable<any> {
    const url = '/api/services/app/Account/GetLastLoginDate';
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  getTenants(keyword: string, page: number, pagesize: number): Observable<any> {
    const url =
      '/api/services/app/Tenant/Search?keyword=' +
      keyword +
      '&pagesize=' +
      pagesize +
      '&page=' +
      page;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  createInvoiceScheduler(obj: any): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/Create';
    return this.httpService.post(url, obj, {
      headers: this.getHttpHeader()
    });
  }

  deleteInvoiceScheduler(id: number): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/Delete?id=' + id;
    return this.httpService.request('delete', url, {
      headers: this.getHttpHeader()
    });
  }

  getInvoiceSchedulerById(id: number): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/FindById?id=' + id;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }

  GetReportTypesForEmailLog(): Observable<any> {
    const url = '/api/services/app/EmailLog/GetEnumValuesAndDescriptions';
    return this.httpService.get(url, {
      headers: this.getHttpHeader()
    });
  }
  FilterEmailLogList(
    keyword: any,
    tenant: any,
    pagesize: number
  ): Observable<any> {
    const url =
      '/api/services/app/EmailLog/TenantBasedSearch?Keyword=' +
      keyword +
      '&tenantId=' +
      tenant +
      '&pagesize=' +
      pagesize;
    return this.httpService.get(url, {
      headers: this.getHttpHeader()
    });
  }
  getPagedEmailLog(
    page: any,
    pagesize: any,
    tenant: any,
    reportType: any,
    emailType: any
  ): Observable<any> {
    const url =
      '/api/services/app/EmailLog/TenantBasedSearch?pagesize=' +
      pagesize +
      '&tenantId=' +
      tenant +
      '&reportType=' +
      reportType +
      '&emailType=' +
      emailType +
      '&page=' +
      page;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  getEmailLogs(
    start: any,
    end: any,
    tenant: any,
    reportType: any,
    emailType: any,
    PageSize: any
  ): Observable<any> {
    const url =
      '/api/services/app/EmailLog/TenantBasedSearch?from=' +
      start +
      '&to=' +
      end +
      '&tenantId=' +
      tenant +
      '&reportType=' +
      reportType +
      '&emailType=' +
      emailType +
      '&PageSize=' +
      PageSize;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  getInvoiceById(id: number): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/FindByInvoiceId?id=' + id;
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  updateInvoiceScheduler(obj: any): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/Modify';
    return this.httpService.put(url, obj, {
      headers: this.getHttpHeader()
    });
  }
  updateInvoicePayment(obj: any): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/ModifyInvoicePayment';
    return this.httpService.put(url, obj, {
      headers: this.getHttpHeader()
    });
  }
  updateInvoiceStatus(obj: any): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/ChangeStatus';
    return this.httpService.put(url, obj, {
      headers: this.getHttpHeader()
    });
  }

  getCompanyNameList(): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/GetCompanyNameList';
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  GetCompanySeat(): Observable<any> {
    const url = '/api/services/app/InvoiceScheduler/GetCompanySeat';
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  getInvoiceTermEnumValuesAndDescriptions(): Observable<any> {
    const url =
      '/api/services/app/InvoiceScheduler/GetInvoiceTermEnumValuesAndDescriptions';
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  getInvoiceStatusEnumValuesAndDescriptions(): Observable<any> {
    const url =
      '/api/services/app/InvoiceScheduler/GetInvoiceStatusEnumValuesAndDescriptions';
    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }

  getInvoiceSchedulers(dateFrom: Date, dateTo: Date): Observable<any> {
    var url = '/api/services/app/InvoiceScheduler/Search';
    if (
      dateFrom != null &&
      dateFrom != undefined &&
      dateTo != null &&
      dateTo != undefined
    ) {
      url = url + '?From=' + dateFrom + '&To=' + dateTo;
    }

    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }

  getInvoiceList(
    dateFrom: Date,
    dateTo: Date,
    Page: number,
    PageSize: number
  ): Observable<any> {
    var url =
      '/api/services/app/InvoiceScheduler/SearchInvoicePayment?Page=' +
      Page +
      '&PageSize=' +
      PageSize;
    if (
      dateFrom != null &&
      dateFrom != undefined &&
      dateTo != null &&
      dateTo != undefined
    ) {
      url = url + '&From=' + dateFrom + '&To=' + dateTo;
    }

    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }

  getAllInvoices(Page: number, PageSize: number): Observable<any> {
    debugger;
    var url =
      '/api/services/app/InvoiceScheduler/GetAllInvoices?Page=' +
      Page +
      '&PageSize=' +
      PageSize;

    return this.httpService.request('get', url, {
      headers: this.getHttpHeader()
    });
  }
  GenerateInvoiceReportPdf(obj: any): Observable<any> {
    var url = '/api/services/app/InvoiceScheduler/GenerateInvoiceReportPdf/';
    return this.http.post(url, obj, {
      headers: this.getHttpHeader()
    });
  }
}
