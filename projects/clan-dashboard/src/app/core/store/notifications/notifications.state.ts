import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
export interface Notification {
  id: string;
  title: string;
  data: any;
}

export interface NotificationState extends EntityState<Notification> {}

export const NotificationAdapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
  selectId: (n: Notification) => n.id,
  sortComparer: false
});

export const NotificationInitialState: NotificationState = NotificationAdapter.getInitialState();
