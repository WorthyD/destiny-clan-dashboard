import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ClanUpdaterService } from '../services/clan-updater.service';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperComponent],
      providers: [
        provideMockStore(),
        {
          provide: ClanUpdaterService,
          useValue: {
            update: () => of({})
          }
        },
        {
          provide: AppConfigService,
          useValue: {
            config: {
              production: false
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
