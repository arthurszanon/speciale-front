import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModelComponent } from './carousel-model.component';

describe('CarouselModelComponent', () => {
  let component: CarouselModelComponent;
  let fixture: ComponentFixture<CarouselModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
