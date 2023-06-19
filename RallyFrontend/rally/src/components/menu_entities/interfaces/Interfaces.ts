export interface Competition {
  _id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  province: string;
}

export interface Category {
  _id: string;
  circuit_id: string;
  name: string;
  description: string;
  winning_team: string;
  participantTeamsIds: string[];
}

export interface Circuit {
  _id: string;
  competition_id: string;
  name: string;
  description: string;
  track_lenght: number;
  location: string;
}

export interface Competitor {
  _id: string;
  name: string;
  age: number;
  identification: string;
  blood_type: string;
  emergencyContact: string;
  province: string;
  city: string;
}

export interface Sponsor {
  _id: string;
  circuits_id: string;
  name: string;
  description: string;
  logo: string;
  web: string;
  contact: string;
}

export interface Team {
  _id: string;
  name: string;
  car_number: string;
  driver: Competitor;
  copilot: Competitor;
}

export interface TeamResult {
  _id: string;
  team_id: string;
  competition: string;
  category: string;
  circuit: string;
  circuit_times: string[];
  total_circuit_times: number;
}
