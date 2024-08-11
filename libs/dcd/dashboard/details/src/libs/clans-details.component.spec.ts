import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansDetailsComponent } from './clans-details.component';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClansDetailsComponent', () => {
  let component: ClansDetailsComponent;
  let fixture: ComponentFixture<ClansDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansDetailsComponent ],
      providers:[
        {
          provide:ClansDetailsService!,
          useValue:{}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
