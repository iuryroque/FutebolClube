export default interface ILogin {
  email: string,
  password: string,
}

export interface IAuth {
  email: string,
}

export interface ICreateMatches {
  homeTeam: number, 
  awayTeam: number, 
  homeTeamGoals: number,
  awayTeamGoals: number,
}
export interface ITeams {
  id: number, 
  teamName: number, 
}

export interface ITable {
  goalsFavor: number, 
  goalsOwn: number, 
}

export interface ITableBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsBalance: number,
  efficiency: number,
  goalsFavor: number, 
  goalsOwn: number,
}
