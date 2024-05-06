import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaBannerComponent } from './galleria-banner.component';

describe('GalleriaBannerComponent', () => {
  let component: GalleriaBannerComponent;
  let fixture: ComponentFixture<GalleriaBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleriaBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleriaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
