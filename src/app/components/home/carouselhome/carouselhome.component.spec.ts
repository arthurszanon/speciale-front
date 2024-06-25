import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselhomeComponent } from './carouselhome.component';

describe('CarouselhomeComponent', () => {
  let component: CarouselhomeComponent;
  let fixture: ComponentFixture<CarouselhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
