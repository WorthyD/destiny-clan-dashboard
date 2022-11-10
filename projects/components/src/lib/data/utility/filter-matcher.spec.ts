import {
  textMatchesEquality,
  numberMatchesEquality,
  dateMatchesEquality,
  stateMatchesEquality,
  textArrayMatchesEquality
} from './filter-matcher';
describe('Filter Matcher', () => {
  describe('textMatchesEquality', () => {
    it('should return false on empty values', () => {
      expect(textMatchesEquality(null, 'testing', 'contains')).toBeFalse();
      expect(textMatchesEquality('testing', null, 'contains')).toBeTrue();
      expect(textMatchesEquality('testing', '""', 'contains')).toBeTrue();
    });

    it('should work with an OR', () => {
      expect(textMatchesEquality('testing', 'test OR fail', 'contains')).toBeTrue();
      expect(textMatchesEquality('testing', 'test OR ""', 'contains')).toBeTrue();
      expect(textMatchesEquality('null', 'test OR fail', 'contains')).toBeFalse();
    });

    it('should work with an AND', () => {
      expect(textMatchesEquality('testing with fail', 'test AND fail', 'contains')).toBeTrue();
      expect(textMatchesEquality('test', 'test AND fail', 'contains')).toBeFalse();
    });
    it('should work with a contains', () => {
      expect(textMatchesEquality('testing with fail', 'test', 'contains')).toBeTrue();
      expect(textMatchesEquality('with fail', 'test', 'contains')).toBeFalse();
    });
    it('should work with a is ', () => {
      expect(textMatchesEquality('test', 'test', 'is')).toBeTrue();
      expect(textMatchesEquality('testing', 'test', 'is')).toBeFalse();
    });
    it('should work with a NotContains', () => {
      expect(textMatchesEquality('with fail', 'test', 'notContains')).toBeTrue();
      expect(textMatchesEquality('test with fail', 'test', 'notContains')).toBeFalse();
    });
    it('should work with a notIs', () => {
      expect(textMatchesEquality('testing', 'test', 'notIs')).toBeTrue();
      expect(textMatchesEquality('test', 'test', 'notIs')).toBeFalse();
    });
    it('should throw error', () => {
      expect(() => {
        textMatchesEquality('test', 'test', null);
      }).toThrowError();
    });
  });

  describe('numberMatchesEquality', () => {
    it('should return true on null', () => {
      expect(numberMatchesEquality(1, null, 'equalTo')).toBeTrue();
    });
    it('should work greater than', () => {
      expect(numberMatchesEquality(10, 5, 'greaterThan')).toBeTrue();
      expect(numberMatchesEquality(10, 50, 'greaterThan')).toBeFalse();
    });
    it('should work less than', () => {
      expect(numberMatchesEquality(5, 10, 'lessThan')).toBeTrue();
      expect(numberMatchesEquality(50, 10, 'lessThan')).toBeFalse();
    });
    it('should work equal to ', () => {
      expect(numberMatchesEquality(5, 5, 'equalTo')).toBeTrue();
      expect(numberMatchesEquality(5, 10, 'equalTo')).toBeFalse();
    });
    it('should throw error  ', () => {
      expect(() => {
        numberMatchesEquality(3, 3, null);
      }).toThrowError();
    });
  });

  describe('dateMatchesEquality', () => {
    it('should work empty filters', () => {
      expect(dateMatchesEquality('1/1/2000', null, 'after')).toBeTrue();
      expect(dateMatchesEquality(null, '1/1/2000', 'after')).toBeFalse();
    });
    it('should work after', () => {
      expect(dateMatchesEquality('1/1/2000', '1/1/1900', 'after')).toBeTrue();
      expect(dateMatchesEquality('1/1/2000', '1/1/2001', 'after')).toBeFalse();
    });
    it('should work before', () => {
      expect(dateMatchesEquality('1/1/1900', '1/1/2000', 'before')).toBeTrue();
      expect(dateMatchesEquality('1/1/2000', '1/1/1900', 'before')).toBeFalse();
    });
    it('should work on', () => {
      expect(dateMatchesEquality('1/1/2000', '1/1/2000', 'on')).toBeTrue();
      expect(dateMatchesEquality('1/1/2000', '1/2/2000', 'on')).toBeFalse();
    });
    it('should throw error  ', () => {
      expect(() => {
        dateMatchesEquality('1/1/1900', '1/1/1900', null);
      }).toThrowError();
    });
  });
  describe('stateMatchesEquality', () => {
    it('should empty', () => {
      expect(stateMatchesEquality(false, '', 'is')).toBeTrue();
      expect(stateMatchesEquality(true, '', 'is')).toBeTrue();
    });
    it('should work is', () => {
      expect(stateMatchesEquality(true, 'test', 'is')).toBeTrue();
      expect(stateMatchesEquality(false, 'test', 'is')).toBeFalse();
    });
    it('should work notIs', () => {
      expect(stateMatchesEquality(false, 'test', 'notIs')).toBeTrue();
      expect(stateMatchesEquality(true, 'test', 'notIs')).toBeFalse();
    });
    it('should throw error', () => {
      expect(() => {
        stateMatchesEquality(false, 'test', null);
      }).toThrowError();
    });
  });
  // describe('textArrayMatchesEquality', () => {
  //   // it('should return false on empty values', () => {
  //   //   // expect(textArrayMatchesEquality([null], 'testing', 'contains')).toBeFalse();
  //   //   // expect(textArrayMatchesEquality(['testing'], null, 'contains')).toBeTrue();
  //   //   // expect(textArrayMatchesEquality(['testing'], '""', 'contains')).toBeTrue();
  //   // });

  //   // it('should work with an OR', () => {
  //   //   // expect(textArrayMatchesEquality(['testing'], 'test OR fail', 'contains')).toBeTrue();
  //   //   // expect(textArrayMatchesEquality(['testing'], 'test OR ""', 'contains')).toBeTrue();
  //   //   // expect(textArrayMatchesEquality(['null'], 'test OR fail', 'contains')).toBeFalse();
  //   // });

  //   // it('should work with an AND', () => {
  //   //   //expect(textArrayMatchesEquality(['test with fail'], 'test AND fail', 'contains')).toBeTrue();
  //   //   //expect(textArrayMatchesEquality(['test'], 'test AND fail', 'contains')).toBeFalse();
  //   // });
  //   // //it('should work standard', () => {
  //     //expect(textArrayMatchesEquality(['testing', 'with', 'fail'], 'test', 'contains')).toBeTrue();
  //     //expect(textArrayMatchesEquality(['test'], 'fail', 'contains')).toBeFalse();
  //   //});
  // });
});
