import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCarrouselComponent } from './hero-carrousel.component';

describe('HeroCarrouselComponent', () => {
  let component: HeroCarrouselComponent;
  let fixture: ComponentFixture<HeroCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCarrouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
