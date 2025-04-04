import { statusCodes } from "./status-code";

export class BadRequestException extends Error {
  constructor(message = "BadRequestException") {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
