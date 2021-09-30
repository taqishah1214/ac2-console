import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiviceComponent } from './invoivice.component';

describe('InvoiviceComponent', () => {
  let component: InvoiviceComponent;
  let fixture: ComponentFixture<InvoiviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiviceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
