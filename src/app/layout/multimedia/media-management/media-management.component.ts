import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DialogService, ConfirmationService } from 'primeng/api';

import { StateService } from 'src/app/shared/service/state.service';
import { MediaService } from '../media.service';
import { ViewMediaComponent } from '../components/view-media/view-media.component';

@Component({
  selector: 'app-media-management',
  templateUrl: './media-management.component.html',
  styleUrls: ['./media-management.component.scss'],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class MediaManagementComponent implements OnInit {
  private inputContainerClass = 'media-search';
  searchInputControls = [
    { type: 'text', containerClassName: this.inputContainerClass, className: 'search tenant-name', controlName: 'tenant_name', placeholder: 'Tenant Name' },
    { type: 'text', containerClassName: this.inputContainerClass, className: 'search identifier', controlName: 'identifier', placeholder: 'Identifier' },
    { type: 'text', containerClassName: this.inputContainerClass, className: 'search tag', controlName: 'tag_name', placeholder: 'Tag' },
    { type: 'text', containerClassName: this.inputContainerClass, className: 'search file-name', controlName: 'file_name', placeholder: 'File Name' },
    { type: 'calendar', containerClassName: this.inputContainerClass, className: 'search promise-date', controlName: 'promise_date', placeholder: 'Promise Date' },
    { type: 'calendar', containerClassName: this.inputContainerClass, className: 'search finish-date', controlName: 'finish_date', placeholder: 'Finish Date' }
  ];
  totalNumber = 0;
  cols = [
    { field: "id", header: "No." },
    { field: "tenant_name", header: "Tenant" },
    { field: "identifier", header: "Identifier" },
    { field: "tag_name", header: "Tag" },
    { field: "file_name", header: "File Name" },
    { field: "mime_type", header: "Mime Type" },
    { field: "file_size", header: "File Size(B)" },
    { field: "created_date", header: "Created Date" },
    { field: "status", header: "Status" }
  ];
  mediaList = [];
  selectedMedia = null;
  isViewing = false;
  isShowRejectLabel = true;

  constructor(
    private state: StateService,
    private route: ActivatedRoute,
    private mediaService: MediaService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.state.resetTitle(d.title);
    });

    this.getMedias();
  }

  getMedias(payload = {}) {
    this.mediaService.getMediaList(payload)
      .subscribe(res => {
        this.mediaList = res.data.map((item, idx) => {
          item.id = idx + 1;
          return item;
        });
        this.totalNumber = res.data.length;
      })
  }

  searcMedia(data) {
    console.log(data);
    this.getMedias(data);
  }

  viewMedia() {
    this.isViewing = true;
    if (this.selectedMedia) {
      this.state.updateEditItem(this.selectedMedia);
      this.isShowRejectLabel = true;
      const ref = this.dialogService.open(ViewMediaComponent, {
        header: 'View Media Detail',
        width: '400px'
      });
      ref.onClose.subscribe((data: any) => {
        this.isViewing = false;
      });
    } else {
      this.isShowRejectLabel = false;
      this.confirmationService.confirm({
        message: 'Please select a media that you want to view~',
        accept: () => {
          this.isViewing = false;
        },
        reject: () => {
          this.isViewing = false;
        }
      });
    }
  }
}
