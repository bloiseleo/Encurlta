import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponseDTO } from '../../common/dto/BaseDTO';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(HttpStatus.UNAUTHORIZED)
      .json(new BaseResponseDTO(HttpStatus.UNAUTHORIZED, exception.message));
  }
}
