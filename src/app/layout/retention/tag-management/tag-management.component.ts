import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StateService } from 'src/app/shared/service/state.service';
import { UtilService } from '../../../shared/service/util.service';
import { RetentionService } from '../retention.service';

import { DialogService, MessageService, ConfirmationService } from 'primeng/api';
import { AddTagComponent } from '../components/add-tag/add-tag.component';
import { EditTagComponent } from '../components/edit-tag/edit-tag.component';
import { TagModel } from '../models/tag.model';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss'],
  providers: [
    ConfirmationService,
    DialogService,
    MessageService
  ]
})
export class TagManagementComponent implements OnInit {
  searchInputControls = [
    { type: 'text', className: 'search tag-name-search', controlName: 'tag_name', placeholder: 'Tag Name' },
    { type: 'text', className: 'search tag-desc-search', controlName: 'tag_description', placeholder: 'Tag Description' },
  ];
  cols = [
    { field: "id", header: "No." },
    { field: "tag_name", header: "Tag" },
    { field: "tag_description", header: "Tag Description" },
    { field: "live_retention", header: "Live Retention (Month)" },
    { field: "cold_retention", header: "Cold Retention (Month)" },
    { field: "status", header: "Status" }
  ];
  tagList = [];
  selectedTag = <TagModel>{};
  totalNumber = 0;
  isAdding = false;
  isDeleting = false;
  isEditing = false;
  isShowRejectLabel = false;
  dialogTitle: string;
  searchedTag = <any>{};
  acceptLabel = 'Yes';

  constructor(
    private route: ActivatedRoute,
    private state: StateService,
    private retentionService: RetentionService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.state.resetTitle(d.title);
    });

    this.getTags();
  }

  getTags() {
    this.retentionService.getTagList({})
      .subscribe(res => {
        if (res.success) {
          const data = res.data;
          this.tagList = this.updateTagList(data);
        }
      });
  }

  updateTagList(data) {
    const mappData = data.map((item, idx) => {
      item.id = idx + 1;
      return item;
    });

    this.totalNumber = data.length;
    return mappData;
  }

  searchTag(data) {
    this.searchedTag = data;
    this.retentionService.getTagList(data)
      .subscribe(res => {
        if (res.success) {
          this.tagList = this.updateTagList(res.data);
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'search tag', detail: err.message });
      })
  }

  onChange(e) {
    for (let i of this.tagList) {
      if (i.id === e.id) {
        i.status = i.status ? 1 : 0;
      }
    }
  }

  addTag() {
    this.isAdding = true;
    const ref = this.dialogService.open(AddTagComponent, {
      header: 'Add Tag',
      width: '400px'
    });

    ref.onClose.subscribe((data: any) => {
      this.isAdding = false;
      if (data) {
        let messageType = 'info';
        if (data.success) {
          this.tagList = this.updateTagList([data, ...this.tagList]);
        } else {
          messageType = 'error';
        }
        this.messageService.add({ severity: messageType, summary: 'add tag', detail: data.message });
      }
    });
  }

  deleteTag() {
    this.isDeleting = true;
    const isSelected = this.utilService.isSelectedItem(this.selectedTag);
    this.dialogTitle = 'Delete Tag';

    if (isSelected) {
      this.isShowRejectLabel = true;
      this.acceptLabel = 'Yes';
      this.confirmationService.confirm({
        message: `Are you sure to delete this Tag?`,
        accept: () => {
          this.retentionService.deleteTag(this.selectedTag.tag_name)
            .subscribe(res => {
              this.isDeleting = false;
              let messageType = 'info';
              let message = res.data.message;

              if (res.success) {
                const idx = this.tagList.findIndex(tag => tag.tag_description === this.selectedTag.tag_description);
                if (idx !== -1) this.tagList.splice(idx, 1);

                this.tagList = [...this.tagList];
                this.selectedTag = <any>{};
              } else {
                messageType = 'error';
                message = res.message;
              }
              this.messageService.add({ severity: messageType, summary: 'Delete tag', detail: message });
            }, err => {
              this.isDeleting = false;
              this.messageService.add({ severity: 'error', summary: 'Delete tag', detail: err.message });
            })

        },
        reject: () => {
          this.isDeleting = false;
        }
      });
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a tag that you want to delete~',
        accept: () => {
          this.isDeleting = false;
        },
        reject: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  editTag() {
    this.dialogTitle = 'Edit Tag';
    this.acceptLabel = 'Yes';
    this.isEditing = true;
    const isSelected = this.utilService.isSelectedItem(this.selectedTag);

    if (isSelected) {
      this.state.updateEditItem(this.selectedTag);
      const ref = this.dialogService.open(EditTagComponent, {
        header: 'Edit Tag',
        width: '400px'
      });
      this.isShowRejectLabel = true;

      ref.onClose.subscribe((data: any) => {
        this.isEditing = false;
        if (data) {
          let messageType = 'info';

          if (data.success) {
            this.tagList = this.tagList.map((tag, idx) => {
              if (tag.tag_key === data.tag_key) {
                data.id = idx + 1;
                data.status = +data.status;
                tag = data;
              }
              return tag;
            });

          } else {
            messageType = 'error';
          }
          this.messageService.add({ severity: messageType, summary: 'edit tag', detail: data.message });
          this.selectedTag = <any>{};
        }
      });
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a tag that you want to edit~',
        accept: () => {
          this.isEditing = false;
        },
        reject: () => {
          this.isEditing = false;
        }
      });
    }
  }
}
