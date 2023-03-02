export type Heroes = {
  id: number;
  name: string;
  slug: string;
  powerStats: PowerStats;
  appearance: Appearance;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
};

type PowerStats = {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
};

type Appearance = {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
};

type Biography = {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
};

type Work = {
  occupation: string;
  base: string;
};
type Connections = {
  groupAffiliation: string;
  relatives: string;
};

type Images = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
};
