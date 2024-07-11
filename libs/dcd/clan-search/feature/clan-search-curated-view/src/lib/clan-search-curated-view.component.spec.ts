import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';

import { ClanSearchCuratedViewComponent } from './clan-search-curated-view.component';
import { ClanSearchService } from '@dcd/clan-search/data-access';

describe('ClanSearchCuratedViewComponent', () => {
  let component: ClanSearchCuratedViewComponent;
  let fixture: ComponentFixture<ClanSearchCuratedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ClanSearchService,
          useValue: {}
        }
      ],
      declarations: [ClanSearchCuratedViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClanSearchCuratedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
