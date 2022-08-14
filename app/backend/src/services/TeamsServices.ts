import Teams from '../database/models/TeamsModel';
import ILogin, { ITeams } from '../interfaces/index';
import { compareSync }  from 'bcryptjs' ; 
import { generateToken, verifyToken } from '../utils/Token';

const getAllTeams = async () => {
  const teams = await Teams.findAll();

  return teams;
}

// const getAllTeamsByMatches = async ():Promise<> => {
//   const teams = await Teams.findAll().success(function (projects) {
//     // project.workers is already populated here
// });

//   return teams;
// }

const getTeamById = async (params: any) => {
  
  const { id } = params;

  const team = await Teams.findByPk(id);
  
  return team;
}

export default {
  getAllTeams,
  getTeamById,
};