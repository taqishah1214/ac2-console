import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiviceComponent } from './edit-invoivice.component';

describe('EditInvoiviceComponent', () => {
  let component: EditInvoiviceComponent;
  let fixture: ComponentFixture<EditInvoiviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditInvoiviceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoiviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
