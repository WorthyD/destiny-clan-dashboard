export interface CuratedActivity {
  hash: number;
  metrics: number[];
}
export const CURATED_ACTIVITIES: CuratedActivity[] = [
  // Spire of Watcher Normal
  {
    hash: 1262462921,
    metrics: [
      3702217360, //Spire of the Watcher Completions
      411086447, //Spire of the Watcher Flawless Solo Completions
      4002846192 //Spire of the Watcher Flawless Completions
    ]
  },
  {
    hash: 1374392663, //2897223272
    metrics: [
      //2496111733, // King's Fall Guided Games
      1624029217, //King's Fall Completions
      //563823293,// King's Fall Carries this week
      //1754378858, // Caries this seas
      4210188841 //  Carries complete
      // 2464307005, //King's Fall Time Trial this season
      //1688789926, // King's Fall Time Trial season
      //399420098 // King's Fall Time Trial
    ]
  },
  {
    hash: 588019350,
    metrics:[
      1365664208, // wins
      1765255052, // flawwless
      2082314848, //Opponents Defeated
      301249970, // Caries
      4112712479, // Flawless seal guilding
    ]
  }
];
