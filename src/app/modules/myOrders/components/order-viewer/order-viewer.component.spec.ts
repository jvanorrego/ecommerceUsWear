import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewerComponent } from './order-viewer.component';

describe('OrderViewerComponent', () => {
  let component: OrderViewerComponent;
  let fixture: ComponentFixture<OrderViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
