import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../utils/StatusCodes';
import TeamsServices from '../services/TeamsServices';
import ValidationMessages from '../utils/ValidationMessages';
import MatchesServices from '../services/MatchesServices';


const redirect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.inProgress) getMatchesByProgress(req, res, next);
    else {
      return getAllMatches(req, res, next)
    }

  } catch (error) {
    next(error);
  }
};

const getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await MatchesServices.getAllMatches()

    return res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

const getMatchesByProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const matches = await MatchesServices.getMatchesByProgress(req.query.inProgress)

    return res.status(StatusCodes.OK).json(matches);
  } catch (error) {
    next(error);
  }
};

const createMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const matches = await MatchesServices.createMatches(req.body)
    if (req.body.homeTeam === req.body.awayTeam) {
      return res.status(StatusCodes.Unauthorized).json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if(!matches) return res.status(StatusCodes.NotFound).json({ message: 'There is no team with such id!' });
    return res.status(StatusCodes.Created).json(matches);
  } catch (error) {
    next(error);
  }
};

const alterMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    await MatchesServices.alterMatches(req)

    return res.status(StatusCodes.OK).json({ message: 'Updated' });
  } catch (error) {
    next(error);
  }
};

const finish = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    await MatchesServices.finish(req.params)

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  } catch (error) {
    next(error);
  }
};

export default {
  redirect,
  getAllMatches,
  getMatchesByProgress,
  createMatches,
  finish,
  alterMatches,
};