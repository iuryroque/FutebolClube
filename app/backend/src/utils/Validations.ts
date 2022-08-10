import { Request, Response, NextFunction } from "express";
import ILogin from "../interfaces"
import StatusCodes from "./StatusCodes";
import { verifyToken } from "./Token";
import ValidationMessages from "./ValidationMessages";

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(StatusCodes.BadRequest).json({ message: ValidationMessages.Login.RequiredEmailAndPass});
  }
  next();
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    
    if (!authorization) {
      return res.status(StatusCodes.BadRequest).json({ message: ValidationMessages.TokenMessage.TokenInvalid});
    }
  
    if(!verifyToken(authorization)) return res.status(StatusCodes.Unauthorized).json({ message: ValidationMessages.TokenMessage.TokenInvalid2});
    
    next();
    
  } catch (error) {
    
    return res.status(StatusCodes.Unauthorized).json({ message: ValidationMessages.TokenMessage.TokenInvalid2});

  }
}