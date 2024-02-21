import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLinkComponent } from './profile-link.component';

describe('ProfileLinkComponent', () => {
  let component: ProfileLinkComponent;
  let fixture: ComponentFixture<ProfileLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProfileLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
