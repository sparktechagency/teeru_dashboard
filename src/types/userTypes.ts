interface UserType {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  joiningDate: string;
  userType: string;
}

interface PlayerType {
  id: number;
  fullName: string;
  email: string;
  golfHandicap: number;
  matchesPlayed: number;
  vector: string;
}

interface ManagerType {
  id: number;
  fullName: string;
  email: string;
  leaguesCreated: number;
  matchesOrganized: number;
}

export type { UserType, PlayerType, ManagerType };
