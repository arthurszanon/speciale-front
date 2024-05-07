import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerEntradaComponent } from './banner-entrada.component';

describe('BannerEntradaComponent', () => {
  let component: BannerEntradaComponent;
  let fixture: ComponentFixture<BannerEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerEntradaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
