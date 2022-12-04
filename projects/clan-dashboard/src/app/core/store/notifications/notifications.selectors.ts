import { createSelector, createFeatureSelector  } from '@ngrx/store';


import { NotificationState, NotificationAdapter } from './notifications.state';

export const selectNotificationsState = createFeatureSelector<NotificationState>('notifications');


export const {
  selectIds: getNotificationIds,
  selectEntities: getNotificationEntities,
  selectAll: getAllNotifications,
  selectTotal: getTotalNotifications
} = NotificationAdapter.getSelectors(selectNotificationsState);
