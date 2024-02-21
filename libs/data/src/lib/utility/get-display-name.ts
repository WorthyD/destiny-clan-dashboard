import { ClanMember, MemberProfile } from '../models';

//
export function getMemberName(member: ClanMember) {
  return `${member?.destinyUserInfo?.displayName || 'Unknown'}`;
}

export function getProfileName(member: MemberProfile) {
  return `${member?.profile?.data?.userInfo?.displayName || 'Unknown'}`;
}

export function getBungieDisplayName(member: MemberProfile) {
  const hash = member?.profile?.data?.userInfo?.bungieGlobalDisplayNameCode
    ? `#${member?.profile?.data?.userInfo?.bungieGlobalDisplayNameCode}`
    : '';
  return `${member?.profile?.data?.userInfo?.bungieGlobalDisplayName || 'Unknown'}${hash}`;
}
