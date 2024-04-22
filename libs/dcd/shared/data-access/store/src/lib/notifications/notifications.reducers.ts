import { createReducer, on } from '@ngrx/store';
import { NotificationInitialState, NotificationAdapter } from './notifications.state';
import { addNotification, removeNotification, updateNotification } from './notifications.actions';

export const NotificationReducer = createReducer(
  NotificationInitialState,
  on(addNotification, (state, { notification }) => {
    return NotificationAdapter.upsertOne(notification, { ...state });
  }),
  on(updateNotification, (state, { notification }) => {
    return NotificationAdapter.upsertOne(notification, { ...state });
  }),
  on(removeNotification, (state, { notification }) => {
    return NotificationAdapter.removeOne(notification.id, { ...state });
  })
);
