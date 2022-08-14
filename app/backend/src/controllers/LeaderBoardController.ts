import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../utils/StatusCodes';
import LoginServices from '../services/LoginServices';
import ValidationMessages from '../utils/ValidationMessages';
import LeaderBoardServices from '../services/LeaderBoardServices';

const getHomeBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await LeaderBoardServices.getHomeBoard()
  
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const getAwayBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await LeaderBoardServices.getAwayBoard()
  
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const getAllBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await LeaderBoardServices.getAllBoard()
  
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

export default {
  getHomeBoard,
  getAwayBoard,
  getAllBoard,
};