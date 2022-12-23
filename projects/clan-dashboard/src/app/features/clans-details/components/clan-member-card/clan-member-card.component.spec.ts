import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanMemberCardComponent } from './clan-member-card.component';

describe('ClanMemberCardComponent', () => {
  let component: ClanMemberCardComponent;
  let fixture: ComponentFixture<ClanMemberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClanMemberCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
