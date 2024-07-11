import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanSearchViewComponent } from './clan-search-view.component';
import { ClanSearchService } from '@dcd/clan-search/data-access';
import { AppConfigService } from '@dcd/shared/utils/app-config';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClanSearchViewComponent', () => {
  let component: ClanSearchViewComponent;
  let fixture: ComponentFixture<ClanSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClanSearchViewComponent],
      providers: [
        {
          provide: ClanSearchService,
          useValue: {}
        },
        {
          provide: AppConfigService,
          useValue: {
            config: {
              appVersion: ''
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClanSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
