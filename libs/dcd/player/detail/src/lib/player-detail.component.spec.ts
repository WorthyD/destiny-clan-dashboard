import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerService } from '@dcd/player/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlayerDetailComponent', () => {
  let component: PlayerDetailComponent;
  let fixture: ComponentFixture<PlayerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: PlayerService, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
