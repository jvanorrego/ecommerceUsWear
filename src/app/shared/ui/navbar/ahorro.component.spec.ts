import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroComponent } from './ahorro.component';

describe('AhorroComponent', () => {
  let component: AhorroComponent;
  let fixture: ComponentFixture<AhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
