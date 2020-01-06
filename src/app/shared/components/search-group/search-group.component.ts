import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { inputItem } from "../../model/input.model";

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.scss']
})
export class SearchGroupComponent implements OnInit {

  @Input() inputControls: inputItem[] = [];
  @Output() onSearch = new EventEmitter();
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;

  constructor() { }

  ngOnInit() {

  }

  search() {
    this.onSearch.emit(this.searchForm.form.value);
  }
}
