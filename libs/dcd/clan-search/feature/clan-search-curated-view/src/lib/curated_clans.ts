import { ClanConfig } from '@dcd/shared/models'
const dod_clans_pc = [
  2073131, // Chums
  5018079, //compadres
  4322250, // DoD Dad Guard
  2866236, // GMT
  4430645, //Family Pride
  4473297, // Guiding light
  4767446 // Lucid Loops
];
const dod_clans_all = [
  //4803739, //DoD Still Vexier Than You
  4523816, //DoD Lightforged
  223562, //DoD Westside
  523657, //DoD Battleborn
  3872451, //DoD Battleborn Ascendant
  1726332 //DoD California
];
const dod_clans_ps = [2942177, 1288185, 2071608, 1771725, 1161209, 2180975, 3136336, 1186355, 1375802];

const dod_clans_xbox = [
  910604, //DOD Chattawhyte Krew
  849654, //DoD Empire/Orbit/Rebellion/United
  1179713, //DoD Iron Warlords
  4271754, //DoD Shenanigans,
  3219957, //DoD Storm ,
  4748154, // DoD West Coast Blueberries
  806412, // DoD X1 Foxtrot,
  167225 //Dads of Destiny X1 Ghost
];
interface CuratedClan {
  key: string;
  title: string;
  clans?: ClanConfig[];
  subGroups?: {
    title: string;
    clans: ClanConfig[];
  }[];
}

function m(c) {
  return c.map((x) => {
    return {
      clanId: x.toString(),
      clanName: '',
      clanTag: '',
      enabled: false,
      memberUpdate: '',
      profileUpdate: '',
      memberRecentActivityUpdate: ''
    };
  });
}

export const DOD: CuratedClan = {
  key: 'dod',
  title: "Dad's of Destiny",
  subGroups: [
    {
      title: 'All Platforms',
      clans: m(dod_clans_all)
    },
    {
      title: 'PC',
      clans: m(dod_clans_pc)
    },
    {
      title: 'Playstation',
      clans: m(dod_clans_ps)
    },
    {
      title: 'Play Station',
      clans: m(dod_clans_xbox)
    }
  ]
};
export const DOD_PC: CuratedClan = {
  key: 'dod-pc',
  title: "Dad's of Destiny",
  subGroups: [
    {
      title: 'PC',
      clans: m([
        2073131, // Chums
        5018079,
        3816773
      ]) //compadres])
    }
  ]
};

export const ALL_CLANS = [DOD, DOD_PC];
