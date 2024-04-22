import { createAction, props } from '@ngrx/store';
import { Notification } from './notifications.state';

const base = '[Notifications] - ';

export const addNotification = createAction(`${base} Add Notification`, props<{ notification: Notification }>());
export const updateNotification = createAction(`${base} Update Notification`, props<{ notification: Notification }>());
export const removeNotification = createAction(`${base} Remove Notification`, props<{ notification: Notification }>());
