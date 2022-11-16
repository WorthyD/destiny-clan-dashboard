import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCellComponent } from './class-cell.component';

describe('ClassCellComponent', () => {
  let component: ClassCellComponent;
  let fixture: ComponentFixture<ClassCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
