import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanInfoComponent } from './clan-info.component';

describe('ClanInfoComponent', () => {
  let component: ClanInfoComponent;
  let fixture: ComponentFixture<ClanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClanInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
