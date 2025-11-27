export interface Vote {
  participantId: string;
  points: number;
}

export interface Participant {
  id: string;
  name: string;
  votes?: Vote[];
  points?: number;
  place?: number;
}

export interface Contest {
  id: string;
  name: string;
  participants?: Participant[];
  results?: any;
}

export interface Route {
  path: string;
  name: string;
  component: React.ReactElement;
}

export interface WindowDimensions {
  width: number;
  height: number;
}
