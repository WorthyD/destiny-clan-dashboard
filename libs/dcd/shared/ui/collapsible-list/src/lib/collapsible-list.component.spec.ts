import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleListComponent } from './collapsible-list.component';

describe('CollapsibleListComponent', () => {
  let component: CollapsibleListComponent;
  let fixture: ComponentFixture<CollapsibleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CollapsibleListComponent, NoopAnimationsModule ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
