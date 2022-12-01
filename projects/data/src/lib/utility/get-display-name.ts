import { ClanMember, MemberProfile } from "../models";

//
export function getMemberName(member: ClanMember) {
  return `${member?.destinyUserInfo?.displayName || 'Uknown'}`;
}

export function getProfileName(member: MemberProfile) {
  return `${member?.profile?.data?.userInfo?.displayName || 'Unkown'}`;
}
