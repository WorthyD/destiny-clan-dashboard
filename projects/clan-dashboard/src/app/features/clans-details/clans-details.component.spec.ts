import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansDetailsComponent } from './clans-details.component';

describe('ClansDetailsComponent', () => {
  let component: ClansDetailsComponent;
  let fixture: ComponentFixture<ClansDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
