import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInfoComponent } from './footer-info.component';

describe('FooterInfoComponent', () => {
  let component: FooterInfoComponent;
  let fixture: ComponentFixture<FooterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
