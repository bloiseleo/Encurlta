import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponseDTO } from '../../common/dto/BaseDTO';
import { AppException } from '../../common/exceptions/AppException';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(exception.status)
      .json(new BaseResponseDTO(exception.status, exception.message));
  }
}
