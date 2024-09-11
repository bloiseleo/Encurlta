import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { InboundLoginDto } from '../dtos/inbound/InboundLoginDto';
import { OutboundLoginDTO } from '../dtos/outbound/OutboundLoginDTO';
import { AuthServiceImpl } from '../services/AuthServiceImpl';
import { BaseResponseDTO } from '../../common/dto/BaseDTO';
import { InboundRegisterDTO } from '../dtos/inbound/InboundRegisterDTO';
import { Response } from 'express';

@Controller('/auth')
export default class AuthController {
  constructor(private authService: AuthServiceImpl) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: InboundLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<OutboundLoginDTO> {
    const token = await this.authService.login(
      data.email ?? '',
      data.password ?? '',
    );
    response.cookie('jwt_token', token, {
      httpOnly: true,
      maxAge: 86400,
    });
    return new OutboundLoginDTO(HttpStatus.OK, token);
  }
  @Post('/register')
  async register(@Body() data: InboundRegisterDTO): Promise<BaseResponseDTO> {
    await this.authService.register(data.email, data.password);
    return new BaseResponseDTO(HttpStatus.CREATED, 'User created successfully');
  }
}
