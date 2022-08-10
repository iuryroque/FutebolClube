import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';

export interface Error {
  message: string;
  status?: StatusCodes;
}

function errorMiddleware(error: Error, req: Request, res: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json(message);
}

export default errorMiddleware;