import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonPassComponent } from './season-pass.component';

describe('SeasonPassComponent', () => {
  let component: SeasonPassComponent;
  let fixture: ComponentFixture<SeasonPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SeasonPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
