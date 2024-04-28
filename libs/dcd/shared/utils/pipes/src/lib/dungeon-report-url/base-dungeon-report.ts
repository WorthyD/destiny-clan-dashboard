import { MembershipTypes } from '@dcd/shared/models';;

const baseUrl = 'https://dungeon.report';
const getPSUrl = (displayName: string) => {
  return `${baseUrl}/ps/${escape(displayName)}`;
};

const getXBOXUrl = (displayName: string) => {
  return `${baseUrl}/xb/${escape(displayName)}`;
};

const getPCUrl = (membershipId: number) => {
  return `${baseUrl}/pc/${membershipId}`;
};
const getStadiaUrl = (membershipId: number) => {
  return `${baseUrl}/stadia/${membershipId}`;
};

export const getDungeonReportUrl = (platform: number, displayName: string, membershipId: number) => {
  switch (platform) {
    case MembershipTypes.Xbox:
      return getXBOXUrl(displayName);
    case MembershipTypes.Psn:
      return getPSUrl(displayName);
    case MembershipTypes.Steam:
      return getPCUrl(membershipId);
    case MembershipTypes.Stadia:
      return getStadiaUrl(membershipId);
    default:
      return '';
  }
};
