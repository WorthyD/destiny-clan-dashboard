import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealMemberProgressTableComponent } from './seal-member-progress-table.component';

describe('SealMemberProgressTableComponent', () => {
  let component: SealMemberProgressTableComponent;
  let fixture: ComponentFixture<SealMemberProgressTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SealMemberProgressTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SealMemberProgressTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
