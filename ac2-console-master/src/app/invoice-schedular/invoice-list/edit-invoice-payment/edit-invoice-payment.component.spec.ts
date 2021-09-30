import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoicePaymentComponent } from './edit-invoice-payment.component';

describe('EditInvoicePaymentComponent', () => {
  let component: EditInvoicePaymentComponent;
  let fixture: ComponentFixture<EditInvoicePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditInvoicePaymentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
