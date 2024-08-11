import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanDetailComponent } from './clan-detail.component';
import { ClanDetailService } from '@dcd/shared/clan-details/data-access';

describe('ClanDetailComponent', () => {
  let component: ClanDetailComponent;
  let fixture: ComponentFixture<ClanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanDetailComponent],
      providers: [
        {
          provide: ClanDetailService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
