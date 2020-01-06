import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchJobLogComponent } from './batch-job-log.component';

describe('BatchJobLogComponent', () => {
  let component: BatchJobLogComponent;
  let fixture: ComponentFixture<BatchJobLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchJobLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchJobLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
