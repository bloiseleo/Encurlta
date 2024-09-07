import LoginDTO from "./dtos/inbound/LoginDTO";
import { LoginResponseDTO } from "./dtos/outbound/LoginResponseDTO";

export interface EncurltaAPI {
  login(data: LoginDTO): Promise<LoginResponseDTO>;
}