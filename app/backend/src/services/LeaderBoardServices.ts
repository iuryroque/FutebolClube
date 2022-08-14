import Users from '../database/models/UsersModel';
import ILogin, { ITable, ITableBoard } from '../interfaces/index';
import MatchesServices from '../services/MatchesServices';
import { compareSync }  from 'bcryptjs' ; 
import { generateToken, verifyToken } from '../utils/Token';
import TeamsServices from './TeamsServices';
import Teams from '../database/models/TeamsModel';

const createTableBoard = (array: ITable[], teamName: string) => {
  const name = teamName;
  const totalPoints = array.reduce((total: number, { goalsFavor, goalsOwn }) => {
    if(goalsFavor > goalsOwn) return total + 3;
    if(goalsFavor === goalsOwn) return total + 1; 
    return total;
  }, 0);
  const totalGames = array.length;

  const totalVictories = array.reduce((total: number, { goalsFavor, goalsOwn }) => {
    if(goalsFavor > goalsOwn) return total + 1;
    return total;
  }, 0);

  const totalDraws = array.reduce((total: number, { goalsFavor, goalsOwn }) => {
    if(goalsFavor === goalsOwn) return total + 1;
    return total;
  }, 0);

  const totalLosses = totalGames - totalVictories - totalDraws;

  const goalsFavor = array.reduce((total: number, { goalsFavor }) => {
    return total + goalsFavor;
  }, 0);

  const goalsOwn = array.reduce((total: number, { goalsOwn }) => {
    return total + goalsOwn;
  }, 0);

  const goalsBalance = goalsFavor - goalsOwn;

  const efficiency = Number(((totalPoints / (totalGames * 3) ) * 100).toFixed(2));

  return {
    name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency
  }
}

const sortTable = (board: ITableBoard[]) => {
    const sortedByGoalsOwn = board.sort((a, b) => a.goalsOwn - b.goalsOwn);
    const sortedByGoalsFavor = sortedByGoalsOwn.sort((a, b) => b.goalsFavor - a.goalsFavor);
    const sortedByBalance = sortedByGoalsFavor.sort((a, b) => b.goalsBalance - a.goalsBalance);
    const sortedByVictory = sortedByBalance.sort((a, b) => b.totalVictories - a.totalVictories);
    const sortedByPoints = sortedByVictory.sort((a, b) => b.totalPoints - a.totalPoints);
    return sortedByPoints;
};

const getHomeBoard = async () => {

  const teams = await Teams.findAll();

  const matches = await MatchesServices.getAllMatches();

  const results: ITableBoard[] = [];

  teams.forEach((team) => {
    const goalsResult = matches
    .filter((match) => match.homeTeam === team.id && match.inProgress === false)
      .map((match) => ({goalsFavor: match.homeTeamGoals, goalsOwn: match.awayTeamGoals}));      
      
      const tableBoard = createTableBoard(goalsResult, team.teamName);

      results.push(tableBoard);
      
  })

 return sortTable(results);
}

const getAwayBoard = async () => {

  const teams = await Teams.findAll();

  const matches = await MatchesServices.getAllMatches();

  const results: ITableBoard[] = [];

  teams.forEach((team) => {
    const goalsResult = matches
    .filter((match) => match.awayTeam === team.id && match.inProgress === false)
      .map((match) => ({goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals}));      
      
      const tableBoard = createTableBoard(goalsResult, team.teamName);

      results.push(tableBoard);
      
  })

 return sortTable(results);
}

const getAllBoard = async () => {

  const teams = await Teams.findAll();

  const matches = await MatchesServices.getAllMatches();

  const results: ITableBoard[] = [];

  teams.forEach((team) => {
    const awayMatches = matches
    .filter((match) => match.awayTeam === team.id && match.inProgress === false)
      .map((match) => ({goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals})); 

    const homeMatches = matches
    .filter((match) => match.homeTeam === team.id && match.inProgress === false)
      .map((match) => ({goalsFavor: match.homeTeamGoals, goalsOwn: match.awayTeamGoals}));      
      
    const goalsResult = [...awayMatches, ...homeMatches];
    const tableBoard = createTableBoard(goalsResult, team.teamName);

    results.push(tableBoard);
      
  })

 return sortTable(results);
}

export default {
  getHomeBoard,
  getAwayBoard,
  getAllBoard,
};
