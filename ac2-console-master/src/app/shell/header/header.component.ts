import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthenticationService,
  CredentialsService,
  I18nService
} from '@app/core';
import { CoreService } from '@app/core/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  authenticateResultModel: any;
  loginDate: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.getLastLoginDate();
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
  getLastLoginDate() {
    this.coreService.getLastLoginDate().subscribe(res => {
      if (res.result != null && res.result != undefined) {
        this.loginDate = res.result;
      }
    });
  }
}
