import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { LoaderComponent, SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './login/login.module';
import { AccountsModule } from './accounts/accounts.module';
import { InvoiceSetupModule } from './invoice-setup/invoice-setup.module';
import { EmailLogsModule } from './email-logs/email-logs.module';
import { UserSeatsModule } from './user-seats/user-seats.module';
import { InvoiceSchedularModule } from './invoice-schedular/invoice-schedular.module';
import { LazyLoadSpinnerComponent } from './core/spinner/lazyload-spinner.component';
import { SpinnerOverlayService } from './core/spinner/spinner.service';
import { SpinnerInterceptor } from './core/spinner/spinner.interceptor';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    AccountsModule,
    InvoiceSetupModule,
    UserSeatsModule,
    LoginModule,
    EmailLogsModule,
    MatFormFieldModule,
    MatInputModule,
    InvoiceSchedularModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, LazyLoadSpinnerComponent],
  entryComponents: [LoaderComponent],
  providers: [
    SpinnerOverlayService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent, LazyLoadSpinnerComponent]
})
export class AppModule {}
