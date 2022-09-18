import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanSearchComponent } from './clan-search.component';

describe('ClanSearchComponent', () => {
  let component: ClanSearchComponent;
  let fixture: ComponentFixture<ClanSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
