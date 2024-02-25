import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansRosterComponent } from './clans-roster.component';

describe('ClansRosterComponent', () => {
  let component: ClansRosterComponent;
  let fixture: ComponentFixture<ClansRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
