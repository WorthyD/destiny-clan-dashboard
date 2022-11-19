export interface MemberActivityTime {
  id: string;
  activities: MemberActivityTimeActivities[];
}

interface MemberActivityTimeActivities {
  date: Date;
  seconds: number;
}
