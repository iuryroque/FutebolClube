import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';

const validUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (!username) {
    return res.status(StatusCodes.BadRequest)
      .json({ message: '"username" is required' });
  }
  next();
};

const validPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) {
    return res.status(StatusCodes.BadRequest)
      .json({ message: '"password" is required' });
  }
  next();
};

export {
  validUsername,
  validPassword,
};
