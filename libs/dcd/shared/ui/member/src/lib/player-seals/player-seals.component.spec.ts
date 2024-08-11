import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerSealsComponent } from './player-seals.component';

describe('PlayerSealsComponent', () => {
  let component: PlayerSealsComponent;
  let fixture: ComponentFixture<PlayerSealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSealsComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
