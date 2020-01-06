import { Component, OnInit, AfterViewInit } from '@angular/core';

import { StateService } from 'src/app/shared/service/state.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss']
})
export class ViewMediaComponent implements OnInit, AfterViewInit {
  inputControls = [];
  mediaDetail = <any>{};

  constructor(
    private state: StateService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.state.editingItem$.subscribe((data: any) => {
      this.mediaDetail = data;
      this.inputControls = [
        { type: 'text', model: data.tenant_name, className: 'tenant-name', controlName: 'tenant_name', placeholder: 'Tenant Name', isDisabled: true },
        { type: 'text', model: data.identifier, className: 'identifier', controlName: 'identifier', placeholder: 'Identifier', isDisabled: true },
        { type: 'text', model: data.tag_name, className: 'tag-name', controlName: 'tag_name', placeholder: 'Tag', isDisabled: true },
        { type: 'text', model: data.file_name, className: 'file-name', controlName: 'file_name', placeholder: 'File Name', isDisabled: true },
        { type: 'text', model: data.mime_type, className: 'mime-type', controlName: 'mime_type', placeholder: 'Mime Type', isDisabled: true },
        { type: 'text', model: data.file_size, className: 'file-size', controlName: 'file_size', placeholder: 'File Size(B)', isDisabled: true },
        { type: 'calendar', model: new Date(data.created_date), className: 'create-date', controlName: 'created_date', placeholder: 'Created Date', isDisabled: true },
        { type: 'text', model: data.status, className: 'status', controlName: 'status', placeholder: 'Status', isDisabled: true }
      ];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.utilService.handleFormItemStatus(this.mediaDetail);
    }, 0);
  }

}
