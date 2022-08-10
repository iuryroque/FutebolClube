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