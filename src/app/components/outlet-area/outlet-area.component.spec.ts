import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletAreaComponent } from './outlet-area.component';

describe('OutletAreaComponent', () => {
  let component: OutletAreaComponent;
  let fixture: ComponentFixture<OutletAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
