enum ProductMessage {
  RequiredName = '"name" is required',
  StringName = '"name" must be a string',
  ShortLengthName = '"name" length must be at least 3 characters long',
  RequiredAmount = '"amount" is required',
  StringAmount = '"amount" must be a string',
  ShortLengthAmount = '"amount" length must be at least 3 characters long',
  RequiredId = '"productsIds" is required',
  NecessarilyArray = '"productsIds" must be an array',
  NotVoid = '"productsIds" must include only numbers',
}

enum Login {
  RequiredEmailAndPass = 'All fields must be filled',
  InvalidUEmailAndPassword = 'Incorrect email or password',
}

enum TokenMessage {
  TokenNotFound = 'Token not found',
  TokenInvalid = 'Invalid token',
  TokenInvalid2 = 'Token must be a valid token',
}



export default {
  ProductMessage,
  Login,
  TokenMessage,
};
