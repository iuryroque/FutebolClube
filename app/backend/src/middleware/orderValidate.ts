import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../utils/StatusCodes';
import { verifyToken } from '../utils/Token';
import ValidationMessage from '../utils/ValidationMessages';

const validToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(StatusCodes.Unauthorized)
        .json({ message: ValidationMessage.TokenMessage.TokenNotFound });
    }
      
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(StatusCodes.Unauthorized)
      .json({ message: ValidationMessage.TokenMessage.TokenInvalid });
  }
};

const validOrder = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productsIds } = req.body;
    if (!productsIds) {
      return res.status(StatusCodes.BadRequest)
        .json({ message: ValidationMessage.ProductMessage.RequiredId });
    }    
    if (!Array.isArray(productsIds)) {
      return res.status(StatusCodes.UnprocessableEntity)
        .json({ message: ValidationMessage.ProductMessage.NecessarilyArray });
    }
    if (productsIds.length < 1) {
      return res.status(StatusCodes.UnprocessableEntity)
        .json({ message: ValidationMessage.ProductMessage.NotVoid });
    }
    next();
  } catch (error) {
    // Foi colocar o numero do status por a quantidade de linhas que o lint reclamou
    return res.status(401).json({ message: ValidationMessage.TokenMessage.TokenInvalid });
  }
};

export default {
  validToken,
  validOrder,
};
