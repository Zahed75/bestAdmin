import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-discount',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
  ],
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.css'
})
export class AddDiscountComponent implements OnInit{
  // Tabs
  tabs = [
    { id: 'general', label: 'General' },
    { id: 'usageRestrictions', label: 'Usage Restrictions' },
    { id: 'usageLimits', label: 'Usage Limits' },
  ];
  activeTab = 'general';

  ngOnInit() {
  }

  // Set active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

}
