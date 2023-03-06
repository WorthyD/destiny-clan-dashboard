import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansActivityCardComponent } from './clans-activity-card.component';

describe('ClansActivityCardComponent', () => {
  let component: ClansActivityCardComponent;
  let fixture: ComponentFixture<ClansActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansActivityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
