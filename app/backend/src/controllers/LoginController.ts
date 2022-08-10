import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../utils/StatusCodes';
import LoginServices from '../services/LoginServices';
import ValidationMessages from '../utils/ValidationMessages';


const getUserLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await LoginServices.getUserLogin(req.body)
    
    if (!user) {
      return res.status(StatusCodes.Unauthorized)
        .json({ message: ValidationMessages.Login.InvalidUEmailAndPassword });
    }
    
    return res.status(StatusCodes.OK).json({ token: user });
  } catch (error) {
    next(error);
  }
};

const getUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('req.header', req.headers);
    const role = await LoginServices.getUserRole(req.headers)
    
    
    return res.status(StatusCodes.OK).json({ role });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserLogin,
  getUserRole,
};