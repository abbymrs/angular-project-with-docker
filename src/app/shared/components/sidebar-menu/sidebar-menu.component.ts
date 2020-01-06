import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StateService } from 'src/app/shared/service/state.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class SidebarMenuComponent implements OnInit {

  items = [
    {
      label: 'Tenant',
      routerLink: '/layout/tenant',
      icon: 'tenant-icon',
      isExpanded: false,
    },
    {
      label: 'Retention',
      routerLink: '/layout/retention/tag-management',
      icon: 'control-icon',
      items: [
        { label: 'Tag Management', routerLink: '/layout/retention/tag-management' },
        { label: 'Batch Job', routerLink: '/layout/retention/batch-job' },
        { label: 'Batch Job Log', routerLink: '/layout/retention/batch-job-log' }
      ],
      isExpanded: false,
    },
    {
      label: 'User',
      routerLink: '/layout/user',
      icon: 'user-icon',
      isExpanded: false,
    },
    {
      label: 'Multimedia',
      routerLink: '/layout/multimedia/media-management',
      icon: 'folder-icon',
      isExpanded: false,
      items: [
        { label: 'M-media Management', routerLink: '/layout/multimedia/media-management' }
      ],
    }
  ];
  currentPath: string;
  isRetention = false;
  isMultimedia = false;

  constructor(
    private location: Location,
    private router: Router,
    public state: StateService
  ) { }

  ngOnInit() {
    this.isRetention = this.getCurrentPath('retention');
    const isMultimedia = this.getCurrentPath('multimedia');

    // open sub menu when the current path is retention
    if (this.isRetention) {
      this.expandMenu('retention');
    } else if (isMultimedia) {
      this.expandMenu('multimedia');
    }

    this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationEnd) {
            this.isRetention = this.getCurrentPath('retention');
          }
        });
  }

  getCurrentPath(path) {
    const currentPath = this.location.path();
    this.currentPath = currentPath;
    return currentPath.indexOf(path) > -1 ? true : false
  }

  expandMenu(menuPath) {
    const menuItem = this.items.filter(item => {
      return item.routerLink.indexOf(menuPath) > -1;
    })[0];
    this.expandSubmenu(menuItem);
  }

  expandSubmenu(menuItem) {
    this.items.forEach(item => item.isExpanded = false)
    menuItem.isExpanded = !menuItem.isExpanded;
  }

  toggleMenu() {
    this.state.isOpenMenu = !this.state.isOpenMenu;
  }

}
