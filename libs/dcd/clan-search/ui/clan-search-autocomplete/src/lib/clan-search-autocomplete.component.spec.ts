import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ClanSearchAutocompleteComponent } from './clan-search-autocomplete.component';

describe('ClanSearchAutocompleteComponent', () => {
  let component: ClanSearchAutocompleteComponent;
  let fixture: ComponentFixture<ClanSearchAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanSearchAutocompleteComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ClanSearchAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
