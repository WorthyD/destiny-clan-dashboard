import { ComponentFixture, TestBed } from '@angular/core/testing';
import { catchError, from, of } from 'rxjs';
import { textMatchesEquality } from './filter-matcher';
describe('Filter Matcher', () => {
  describe('textMatchesEquality', () => {
    it('should return false on empty values', () => {
      expect(textMatchesEquality(null, 'testing', 'contains')).toBeFalse();
      expect(textMatchesEquality('testing', null, 'contains')).toBeTrue();
    });
  });

  // describe('numberMatchesEquality', () => {});

  // describe('dateMatchesEquality', () => {});
  // describe('stateMatchesEquality', () => {});
  // describe('textArrayMatchesEquality', () => {});
});
