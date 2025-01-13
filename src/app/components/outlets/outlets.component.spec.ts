import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletsComponent } from './outlets.component';

describe('OutletsComponent', () => {
  let component: OutletsComponent;
  let fixture: ComponentFixture<OutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
