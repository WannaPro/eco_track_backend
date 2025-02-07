/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
