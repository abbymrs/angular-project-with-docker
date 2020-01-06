import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingIndicatorService } from './shared/service/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: Observable<boolean>;

  constructor(
    private loadingIndicatorService: LoadingIndicatorService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.loadingIndicatorService.onLoadingChange;
  }
}
