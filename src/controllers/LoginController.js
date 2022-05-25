const LoginService = require('../services/LoginService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    if (token) {
      return res.status(200).json({ token });    
    }
    return res.status(400).json({ message: 'Invalid fields' }); 
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};