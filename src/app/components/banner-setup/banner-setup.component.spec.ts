import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSetupComponent } from './banner-setup.component';

describe('BannerSetupComponent', () => {
  let component: BannerSetupComponent;
  let fixture: ComponentFixture<BannerSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
