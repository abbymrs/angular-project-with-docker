import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchJobComponent } from './add-batch-job.component';

describe('AddBatchJobComponent', () => {
  let component: AddBatchJobComponent;
  let fixture: ComponentFixture<AddBatchJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatchJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
