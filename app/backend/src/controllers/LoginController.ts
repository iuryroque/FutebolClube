import { Request, Response, NextFunction } from 'express';

interface Login {
  email: string;
  password: string;
}

const getUserLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    
    return res.status(200).json({ message: req.body });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserLogin,
};