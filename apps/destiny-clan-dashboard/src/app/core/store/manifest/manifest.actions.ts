import { createAction, props } from '@ngrx/store';

const base = '[Manifest] - ';
const name = (sr) => `${base}${sr}`;

export const loadManifest = createAction(name('load'));
export const loadManifestComplete = createAction(name('complete'));
export const loadManifestFailure = createAction(name('failure'), props<{ error: any }>());
