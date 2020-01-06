import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from 'src/app/shared/service/state.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public state: StateService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signOut() {
    this.headerService.signOut()
      .subscribe(res => {
        if (res.code === 0) {
          this.signIn();
        }
      }, err => {

      })
  }

}
