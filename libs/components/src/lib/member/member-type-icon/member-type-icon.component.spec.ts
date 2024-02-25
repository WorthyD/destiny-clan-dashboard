import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypeIconComponent } from './member-type-icon.component';

describe('MemberTypeIconComponent', () => {
  let component: MemberTypeIconComponent;
  let fixture: ComponentFixture<MemberTypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MemberTypeIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
