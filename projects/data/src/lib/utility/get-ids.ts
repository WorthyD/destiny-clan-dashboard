import { ClanMember, MemberProfile } from "../models";

export function getClanMemberId(member: ClanMember) {
  return `${member?.destinyUserInfo?.membershipType}-${member?.destinyUserInfo?.membershipId}`;
}

export function getMemberProfileId(member: MemberProfile) {
  return `${member?.profile?.data?.userInfo?.membershipType}-${member?.profile?.data?.userInfo?.membershipId}`;
}
