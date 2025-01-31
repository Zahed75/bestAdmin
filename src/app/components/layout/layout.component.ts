import {Component, inject, OnInit, OnDestroy, Renderer2, ElementRef} from '@angular/core';
import {RouterLink, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from '../dashboard/dashboard.service';
import {filter} from 'rxjs/operators';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  router = inject(Router);
  dashService = inject(DashboardService);
  http = inject(HttpClient);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  private sidebar: HTMLElement | null = null;
  private toggleButton: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private unlistenClickOutside: (() => void) | null = null;
  isSidebarOpen = false;

  constructor() {
    // Listen for route changes to close the sidebar
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeSidebar();
      });
  }

  ngOnInit() {
    this.sidebar = this.el.nativeElement.querySelector('#sidebar-multi-level-sidebar');
    this.toggleButton = this.el.nativeElement.querySelector('[data-drawer-toggle="sidebar-multi-level-sidebar"]');
    this.overlay = this.el.nativeElement.querySelector('#sidebar-overlay');

    // Initialize the sidebar toggle functionality
    if (this.toggleButton && this.sidebar) {
      this.renderer.listen(this.toggleButton, 'click', () => {
        this.toggleSidebar();
      });
    }

    // Close sidebar when clicking outside
    this.unlistenClickOutside = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (
        this.sidebar &&
        !this.sidebar.contains(event.target as Node) &&
        !this.toggleButton?.contains(event.target as Node)
      ) {
        this.closeSidebar();
      }
    });

    // Restore sidebar state from localStorage (optional)
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'open' && this.sidebar) {
      this.renderer.removeClass(this.sidebar, '-translate-x-full');
      this.isSidebarOpen = true;
    } else {
      this.isSidebarOpen = false; // Ensure this is set to false if the sidebar is closed
    }
  }

  ngOnDestroy() {
    // Clean up the event listener
    if (this.unlistenClickOutside) {
      this.unlistenClickOutside();
    }
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        this.renderer.removeClass(this.sidebar, '-translate-x-full');
        localStorage.setItem('sidebarState', 'open'); // Save state (optional)
      } else {
        this.renderer.addClass(this.sidebar, '-translate-x-full');
        localStorage.setItem('sidebarState', 'closed'); // Save state (optional)
      }
    }
  }

  closeSidebar() {
    if (this.sidebar && this.isSidebarOpen) {
      this.renderer.addClass(this.sidebar, '-translate-x-full');
      this.isSidebarOpen = false;
      localStorage.setItem('sidebarState', 'closed'); // Save state (optional)
    }
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('sidebarState'); // Clear sidebar state on logout
    this.router.navigateByUrl('login');
  }
}
