import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletCreationComponent } from './outlet-creation.component';

describe('OutletCreationComponent', () => {
  let component: OutletCreationComponent;
  let fixture: ComponentFixture<OutletCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutletCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutletCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
