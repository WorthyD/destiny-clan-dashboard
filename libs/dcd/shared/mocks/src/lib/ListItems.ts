export interface MockListItem {
  id: number;
  name: string;
  startDate: string;
  isPublic:unknown;
}
const names = [
  'Sweeney Herring',
  'Jacquelyn Malone',
  'Wheeler Figueroa',
  'Phillips Mill',
  'Buchanan Cole',
  'Saundra Fitzpatrick',
  'Clara Campos',
  'James Barr',
  'Veronica Pitts',
  'Veronica Pitt3'
];

export const MOCK_LIST_ITEMS: MockListItem[] = names.map((name, index) => {
  return {
    id: index,
    isPublic: true,
    name: name,
    startDate: new Date().toString()
  };
});
