import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvoiviceComponent } from './new-invoivice.component';

describe('NewInvoiviceComponent', () => {
  let component: NewInvoiviceComponent;
  let fixture: ComponentFixture<NewInvoiviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewInvoiviceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInvoiviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
