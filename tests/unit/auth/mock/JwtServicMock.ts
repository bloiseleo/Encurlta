import { JwtService } from '@nestjs/jwt';

export const JwtServicMock = {
  sign: jest.fn(() => {
    return 'token';
  }),
} as unknown as jest.Mocked<JwtService>;
