import { ClanMember } from '../models/ClanMember';
// import { MemberProfile } from "../models/MemberProfile";

export function getClanMemberId(member: ClanMember) {
  return `${member?.destinyUserInfo?.membershipType}-${member?.destinyUserInfo?.membershipId}`;
}

// TODO: Proper map
export function getMemberProfileId(member) {
  return `${member?.profile?.data?.userInfo?.membershipType}-${member?.profile?.data?.userInfo?.membershipId}`;
}
