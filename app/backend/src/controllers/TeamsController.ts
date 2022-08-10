import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../utils/StatusCodes';
import TeamsServices from '../services/TeamsServices';
import ValidationMessages from '../utils/ValidationMessages';


const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await TeamsServices.getAllTeams()

    return res.status(StatusCodes.OK).json(teams);
  } catch (error) {
    next(error);
  }
};

const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await TeamsServices.getTeamById(req.params)

    return res.status(StatusCodes.OK).json(team);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTeams,
  getTeamById,
};