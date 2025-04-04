import { responseError } from "./reponse";

export const handleError = (err, req, res, next) => {
  console.log(err);

  let statusCode = err.status || 500;

  const response = responseError(err.message, statusCode, err.stack);
  res.status(response.statusCode).json(response);
};
