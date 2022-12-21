import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanDetailComponent } from './clan-detail.component';

describe('ClanDetailComponent', () => {
  let component: ClanDetailComponent;
  let fixture: ComponentFixture<ClanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClanDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
