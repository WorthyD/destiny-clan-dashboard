


export interface MemberActivityTime {
  id: string;
  activities: MemberActivityTimeActivities[];
}

export interface MemberActivityTimeActivities {
  date: Date;
  seconds: number;
}
