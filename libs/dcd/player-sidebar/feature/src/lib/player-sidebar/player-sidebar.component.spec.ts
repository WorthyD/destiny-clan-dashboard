import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerSidebarComponent } from './player-sidebar.component';

describe('PlayerSidebarComponent', () => {
  let component: PlayerSidebarComponent;
  let fixture: ComponentFixture<PlayerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
