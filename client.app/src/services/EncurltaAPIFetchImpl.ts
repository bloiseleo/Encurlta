import LoginDTO from './dtos/inbound/LoginDTO';
import { LoginResponseDTO } from './dtos/outbound/LoginResponseDTO';
import { EncurltaAPI } from './EncurltaAPI';

export default class EncurltaAPIFetchImpl implements EncurltaAPI {
  constructor() {

  }
  login(data: LoginDTO): Promise<LoginResponseDTO> {
    throw new Error('Method not implemented.');

  }
}