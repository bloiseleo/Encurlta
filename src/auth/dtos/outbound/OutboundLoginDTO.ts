import { BaseResponseDTO } from '../../../common/dto/BaseDTO';
import { HttpStatus } from '@nestjs/common';

export class OutboundLoginDTO extends BaseResponseDTO {
  constructor(
    status: HttpStatus,
    public token: string,
  ) {
    super(
      status,
      status == HttpStatus.OK
        ? 'User authenticated sucessfully'
        : 'User could not be authenticated',
    );
  }
}
