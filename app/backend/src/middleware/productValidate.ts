import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';
import ValidationMessage from '../utils/ValidationMessages';

const validName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return res.status(StatusCodes.BadRequest)
      .json({ message: ValidationMessage.ProductMessage.RequiredName });
  }
  if (typeof (name) !== 'string') {
    return res.status(StatusCodes.UnprocessableEntity)
      .json({ message: ValidationMessage.ProductMessage.StringName });
  }
  if (name.length < 3) {
    return res.status(StatusCodes.UnprocessableEntity)
      .json({ message: ValidationMessage.ProductMessage.ShortLengthName });
  }
  next();
};

const validAmount = (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(StatusCodes.BadRequest)
      .json({ message: ValidationMessage.ProductMessage.RequiredAmount });
  }
  if (typeof (amount) !== 'string') {
    return res.status(StatusCodes.UnprocessableEntity)
      .json({ message: ValidationMessage.ProductMessage.StringAmount });
  }
  if (amount.length < 3) {
    return res.status(StatusCodes.UnprocessableEntity)
      .json({ message: ValidationMessage.ProductMessage.ShortLengthAmount });
  }
  next();
};

export {
  validName,
  validAmount,
};
