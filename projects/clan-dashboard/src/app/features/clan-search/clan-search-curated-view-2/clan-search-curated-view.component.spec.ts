import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanSearchCuratedViewComponent } from './clan-search-curated-view.component';

describe('ClanSearchCuratedViewComponent', () => {
  let component: ClanSearchCuratedViewComponent;
  let fixture: ComponentFixture<ClanSearchCuratedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanSearchCuratedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanSearchCuratedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
