import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanSearchViewComponent } from './clan-search-view.component';

describe('ClanSearchViewComponent', () => {
  let component: ClanSearchViewComponent;
  let fixture: ComponentFixture<ClanSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanSearchViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
