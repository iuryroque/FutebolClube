import jwt = require('jsonwebtoken');
import ILogin from '../interfaces/index';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

// export default function generateInitialToken(payload: InterfaceUser) {
//   return jwt.sign(payload, 'segredinho', { expiresIn: '5m' });
// }

export function generateToken(payload: ILogin) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as jwt.JwtPayload;
}
