import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanDetailCellComponent } from './clan-detail-cell.component';

describe('ClanDetailCellComponent', () => {
  let component: ClanDetailCellComponent;
  let fixture: ComponentFixture<ClanDetailCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClanDetailCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanDetailCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
