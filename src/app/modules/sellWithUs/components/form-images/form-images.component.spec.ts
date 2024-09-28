import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImagesComponent } from './form-images.component';

describe('FormImagesComponent', () => {
  let component: FormImagesComponent;
  let fixture: ComponentFixture<FormImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
