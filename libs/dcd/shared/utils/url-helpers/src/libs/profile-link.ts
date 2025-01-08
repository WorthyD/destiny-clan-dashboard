import { MemberProfile } from '@dcd/shared/models';

export const getProfileUrl = (memberProfile: MemberProfile): string => {
  return `/player/${memberProfile?.profile?.data?.userInfo?.membershipType}-${memberProfile?.profile?.data?.userInfo?.membershipId}`;
};
