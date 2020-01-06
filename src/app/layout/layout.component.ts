import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/shared/service/state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title: string;
  constructor(
    public state: StateService
  ) { }

  ngOnInit() {
    this.state.title$.subscribe(title => {
      this.title = title;
    })

  }

}
