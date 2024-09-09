import LoginDTO from './dtos/inbound/LoginDTO';
import { LoginResponseDTO } from './dtos/outbound/LoginResponseDTO';
import { EncurltaAPI } from './EncurltaAPI';
import { BaseResponseDTO } from './dtos/outbound/BaseResponseDTO';
import { RegisterDTO } from './dtos/inbound/RegisterDTO';


export default class EncurltaAPIFetchImpl implements EncurltaAPI {
  private BASE_URL: string;
  constructor(baseUrl?: string) {
    this.BASE_URL = baseUrl ?? "http://localhost:3000";
  }
  private buildHeaders(): Headers {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    return headers;
  }
  async register(data: RegisterDTO): Promise<BaseResponseDTO> {

    try {
      const response = await fetch(`${this.BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: this.buildHeaders()
      });
      return await response.json();
    } catch (e: unknown) {
      console.error(e);
      return {
        message: 'Internal Error. Please, send me an email',
        time: new Date().toString(),
        status: 500
      }
    }
  }
  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: this.buildHeaders()
      });
      return await response.json();
    } catch(e: unknown) {
      console.error(e);
      return {
        message: 'Internal Error. Please, send me an email',
        time: new Date().toString(),
        status: 500,
        token: ''
      }
    }
  }
}