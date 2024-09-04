import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import UserServiceImpl from "./services/UserServiceImpl";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserServiceImpl],
  exports: [UserServiceImpl]
})
export class UserModule {}
