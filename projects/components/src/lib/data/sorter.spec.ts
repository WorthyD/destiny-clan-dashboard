import { ComponentFixture, TestBed } from '@angular/core/testing';
import { catchError, from, of } from 'rxjs';
import { MockListItem, MOCK_LIST_ITEMS } from '../__mocks__/ListItems';
import { EXAMPLE_SORTER_METADATA } from '../__mocks__/ListItemSorter';
import { Sorter, SorterMetadata } from './sorter';

describe('Sorter', () => {
  beforeEach(async () => {});

  it('should create', () => {
    const sorter = new Sorter({ metadata: EXAMPLE_SORTER_METADATA });
    expect(sorter.getSorts().length).toBe(2);
  });
  it('should default sort items', (done) => {
    const sorter = new Sorter({ metadata: EXAMPLE_SORTER_METADATA });
    const obs = of(MOCK_LIST_ITEMS);
    const sortObs = sorter.sort()(obs);
    sortObs.subscribe((x) => {
      const resultMap = x.map((y) => y.id);
      const expectedMap = MOCK_LIST_ITEMS.map((y) => y.id).sort((a, b) => (a < b ? -1 : 1));
      expect(resultMap).toEqual(expectedMap);
      done();
    });
  });
  it('should reverse sorttems', (done) => {
    const sorter = new Sorter({ metadata: EXAMPLE_SORTER_METADATA });
    sorter.setState({ sort: 'id', reverse: true });
    const obs = of(MOCK_LIST_ITEMS);
    const sortObs = sorter.sort()(obs);
    sortObs.subscribe((x) => {
      const resultMap = x.map((y) => y.id);
      const expectedMap = MOCK_LIST_ITEMS.map((y) => y.id).sort((a, b) => (a > b ? -1 : 1));
      expect(resultMap).toEqual(expectedMap);
      done();
    });
  });
  it('should allow next sort', (done) => {
    const sorter = new Sorter({ metadata: EXAMPLE_SORTER_METADATA });
    sorter.setState({ sort: 'name', reverse: false });
    const obs = of(MOCK_LIST_ITEMS);
    const sortObs = sorter.sort()(obs);

    sortObs.subscribe((x) => {
      const resultMap = x.map((y) => y.name);
      const expectedMap = MOCK_LIST_ITEMS.map((y) => y.name).sort((a, b) =>
        a.toLowerCase() < b.toLowerCase() ? -1 : 1
      );
      expect(resultMap).toEqual(expectedMap);
      done();
    });
  });
  it('should error on invalid config', (done) => {
    const sorter = new Sorter({ metadata: EXAMPLE_SORTER_METADATA });
    sorter.setState({ sort: 'fake', reverse: false });
    const obs = of(MOCK_LIST_ITEMS);
    const sortObs = sorter.sort()(obs);

    sortObs
      .pipe(
        catchError((err) => {
          expect(err.message).toEqual('No configuration set up for sort fake');
          return of(null);
        })
      )
      .subscribe((x) => {
        console.log('found error');
        done();
      });
  });
});
