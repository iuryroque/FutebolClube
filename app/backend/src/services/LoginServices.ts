import Users from '../database/models/UsersModel';
import ILogin from '../interfaces/index';
import { compareSync }  from 'bcryptjs' ; 
import { generateToken, verifyToken } from '../utils/Token';

const getUserLogin = async (body: ILogin) => {
  const { email, password } = body
  const [user] = await Users.findAll({
    where: {
      email,
    }
  })

  if (!user) return false

 const validPassword = compareSync(password, user.password)
 
 if (!validPassword) return false;

  const token = generateToken(body);  

 return token;
}

const getUserRole = async (header: any) => {
  
  const { email } = verifyToken(header.authorization);

  const [user] = await Users.findAll({
    where: {
      email,
    }
  })

  const { role } = user;

  return role;
}

export default {
  getUserLogin,
  getUserRole,
};