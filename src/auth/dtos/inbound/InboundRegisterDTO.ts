import { IsEmail, Length } from 'class-validator';

export class InboundRegisterDTO {
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    },
  )
  email: string;
  @Length(3, undefined, {
    message: 'Password must have at least 3 characters',
  })
  password: string;
}
