import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { StateService } from 'src/app/shared/service/state.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { RetentionService } from '../../retention.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit, AfterViewInit {

  inputControls = [];
  tag = <any>{};
  tag_key: number;
  @ViewChild('editTagForm', { static: false }) editTagForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private state: StateService,
    private utilService: UtilService,
    private retentionService: RetentionService
  ) { }

  ngOnInit() {
    this.state.editingItem$.subscribe((data: any) => {
      this.tag = data;
      this.tag_key = data.tag_key;
      this.inputControls = [
        { type: 'text', model: data.tag_name, className: 'tag', controlName: 'tag_name', placeholder: 'Tag Name', isRequired: true, isDisabled: true },
        { type: 'text', model: data.tag_description, className: 'tag_description', controlName: 'tag_description', placeholder: 'Tag Description', isRequired: true },
        { type: 'number', model: data.live_retention, className: 'live-retention', controlName: 'live_retention', placeholder: 'Live Retention Policy (Month)', minNumber: 12, isRequired: true },
        { type: 'number', model: data.cold_retention, className: 'cold-retention', controlName: 'cold_retention', placeholder: 'Cold Retention Policy (Month)', minNumber: 3, isRequired: true },
        {
          type: 'select',
          labelName: "status",
          model: data.status,
          controlName: 'status',
          optionsData: [
            { id: 1, value: "Active" },
            { id: 0, value: "Inactive" }
          ],
          isRequired: true
        }
      ];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.utilService.handleFormItemStatus(this.tag);
      (<HTMLInputElement>document.querySelector('.tag_description')).focus();
    }, 0);
  }

  editTag() {
    this.retentionService.validateFormWithMinVal(this.editTagForm, this.inputControls, this.ref, '.edit-tag-form', false, this.tag_key);
  }

}
