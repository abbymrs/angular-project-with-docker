import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { RetentionService } from '../../retention.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit, AfterViewInit {
  userModel = {
    tag_name: '',
    tag_description: '',
    live_retention: '',
    cold_retention: '',
    status: ''
  };
  inputControls = [
    { type: 'text', model: this.userModel.tag_name, className: 'tag', controlName: 'tag_name', placeholder: 'Tag Name', isRequired: true },
    { type: 'text', model: this.userModel.tag_description, className: 'tag_description', controlName: 'tag_description', placeholder: 'Tag Description', isRequired: true },
    { type: 'number', model: this.userModel.live_retention, className: 'live-retention', controlName: 'live_retention', placeholder: 'Live Retention Policy (Month)', minNumber: 12, isRequired: true },
    { type: 'number', model: this.userModel.cold_retention, className: 'cold-retention', controlName: 'cold_retention', placeholder: 'Cold Retention Policy (Month)', minNumber: 3, isRequired: true },
    {
      type: 'select',
      labelName: "status",
      model: this.userModel.status,
      controlName: 'status',
      optionsData: [
        { id: 1, value: "Active" },
        { id: 0, value: "Inactive" }
      ],
      isRequired: true
    }
  ];
  @ViewChild('addTagForm', { static: false }) addTagForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private retentionService: RetentionService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.setDefaultStatus();
      (<HTMLInputElement>document.querySelector('.tag')).focus();
    })
  }

  setDefaultStatus() {
    const aTags = document.querySelectorAll('app-select .select-panel a');
    (<HTMLElement>aTags[0]).click();
  }

  addTag() {
    this.retentionService.validateFormWithMinVal(this.addTagForm, this.inputControls, this.ref, '.add-tag-form');
  }
}
