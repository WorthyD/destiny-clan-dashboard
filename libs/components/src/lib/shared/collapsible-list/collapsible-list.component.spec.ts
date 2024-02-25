import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleListComponent } from './collapsible-list.component';

describe('CollapsibleListComponent', () => {
  let component: CollapsibleListComponent;
  let fixture: ComponentFixture<CollapsibleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CollapsibleListComponent ]
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
