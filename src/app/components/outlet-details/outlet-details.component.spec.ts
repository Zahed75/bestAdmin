import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletDetailsComponent } from './outlet-details.component';

describe('OutletDetailsComponent', () => {
  let component: OutletDetailsComponent;
  let fixture: ComponentFixture<OutletDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
