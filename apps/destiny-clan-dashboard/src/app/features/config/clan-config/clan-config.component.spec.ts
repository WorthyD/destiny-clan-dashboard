import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanConfigComponent } from './clan-config.component';

describe('ClanConfigComponent', () => {
  let component: ClanConfigComponent;
  let fixture: ComponentFixture<ClanConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
