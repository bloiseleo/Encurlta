import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InboundLoginDto } from '../dtos/inbound/InboundLoginDto';
import { OutboundLoginDTO } from '../dtos/outbound/OutboundLoginDTO';
import { AuthServiceImpl } from '../services/AuthServiceImpl';
import { BaseResponseDTO } from '../../common/dto/BaseDTO';

@Controller('/auth')
export default class AuthController {
  constructor(private authService: AuthServiceImpl) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: InboundLoginDto): Promise<OutboundLoginDTO> {
    const token = await this.authService.login(data.email, data.password);
    return new OutboundLoginDTO(HttpStatus.OK, token);
  }
  @Post('/register')
  async register(@Body() data: InboundLoginDto): Promise<BaseResponseDTO> {
    await this.authService.register(data.email, data.password);
    return new BaseResponseDTO(HttpStatus.CREATED, 'User created successfully');
  }
}
