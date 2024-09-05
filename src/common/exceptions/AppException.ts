import { HttpStatus } from '@nestjs/common';

export abstract class AppException extends Error {
  private _status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  constructor(message: string, status?: HttpStatus) {
    super(message);
    if (status) {
      this._status = status;
    }
  }
  get status(): HttpStatus {
    return this._status;
  }
}
