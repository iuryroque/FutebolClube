enum StatusCodes {
  OK = 200,
  Created,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  UnprocessableEntity = 422,
}

export default StatusCodes;
