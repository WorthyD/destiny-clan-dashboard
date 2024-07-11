import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchErrorDialogComponent } from './search-error-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('SearchErrorDialogComponent', () => {
  let component: SearchErrorDialogComponent;
  let fixture: ComponentFixture<SearchErrorDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SearchErrorDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
