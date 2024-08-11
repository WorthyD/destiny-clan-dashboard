import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BungieInfoComponent } from './bungie-info.component';

describe('BungieInfoComponent', () => {
  let component: BungieInfoComponent;
  let fixture: ComponentFixture<BungieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [],
      imports: [BungieInfoComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BungieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
