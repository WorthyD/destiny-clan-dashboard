import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSnapshotComponent } from './player-snapshot.component';

describe('PlayerSnapshotComponent', () => {
  let component: PlayerSnapshotComponent;
  let fixture: ComponentFixture<PlayerSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSnapshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
