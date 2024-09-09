import LoginDTO from "./dtos/inbound/LoginDTO";
import { LoginResponseDTO } from "./dtos/outbound/LoginResponseDTO";
import { RegisterDTO } from './dtos/inbound/RegisterDTO';
import { BaseResponseDTO } from './dtos/outbound/BaseResponseDTO';

export interface EncurltaAPI {
  login(data: LoginDTO): Promise<LoginResponseDTO>;
  register(data: RegisterDTO): Promise<BaseResponseDTO>;
}