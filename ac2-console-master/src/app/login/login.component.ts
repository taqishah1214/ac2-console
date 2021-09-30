import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { CoreService } from '../core/core.service';

import { environment } from '@env/environment';
import {
  Logger,
  I18nService,
  AuthenticationService,
  untilDestroyed,
  CredentialsService
} from '@app/core';
import { Session } from 'protractor';
import { MatDialog } from '@angular/material';
import { error } from 'jquery';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  userName: any;
  password: any;
  authenticateResultModel: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private coreService: CoreService,
    private credentialsService: CredentialsService,
    public dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    const logins$ = this.authenticationService.login(this.loginForm.value);
    //this.router.navigate(['/accounts']);

    // this.router.navigate(
    //   [this.route.snapshot.queryParams.redirect || '/Invoicing'],
    //   { replaceUrl: true }
    // );
    this.isLoading = true;
    var obj = {
      userName: this.userName,
      password: this.password
    };

    const login$ = this.coreService.loginUser(obj);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials: any) => {
          this.authenticateResultModel = credentials;
          if (
            this.authenticateResultModel.result.accessToken != '' &&
            this.authenticateResultModel.result.userId != '' &&
            this.authenticateResultModel.result.tenantId != ''
          ) {
            const data = {
              username: this.authenticateResultModel.result.userName,
              token: this.authenticateResultModel.result.accessToken,
              companyName: this.authenticateResultModel.result.tenantId,
              userId: this.authenticateResultModel.result.userId
            };
            this.credentialsService.setCredentials(data, true);

            this.router.navigate(['/accounts']);
          } else {
            this.error = 'username or password incorrect';
          }
        },
        (error: string) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
