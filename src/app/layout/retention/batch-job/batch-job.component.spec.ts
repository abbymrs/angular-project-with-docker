import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchJobComponent } from './batch-job.component';

describe('BatchJobComponent', () => {
  let component: BatchJobComponent;
  let fixture: ComponentFixture<BatchJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
