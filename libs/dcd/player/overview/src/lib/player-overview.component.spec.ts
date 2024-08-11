import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { PlayerOverviewComponent } from './player-overview.component';
import { PlayerService } from '@dcd/player/data-access';
import { BungieInfoService } from '@dcd/shared/data-access/bungie-info';
import { DefinitionService } from '@dcd/shared/data-access/definitions';
import { GlobalSealsService } from '@dcd/shared/data-access/seals';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PlayerOverviewComponent', () => {
  let component: PlayerOverviewComponent;
  let fixture: ComponentFixture<PlayerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerOverviewComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: PlayerService,
          useValue: {}
        },
        { provide: BungieInfoService, useValue: {} },
        { provide: GlobalSealsService, useValue: {} },
        { provide: DefinitionService, useValue: {} }

        /*    private route: ActivatedRoute,
    private playerService: PlayerService,

    private bungieInfoService: BungieInfoService,
    private globalSealsService: GlobalSealsService,
    private definitionService: DefinitionService*/
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
