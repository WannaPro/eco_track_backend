/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    ActionsModule
  ],
  exports: [JwtModule], // Exporta o JwtModule para uso em outros módulos
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
  ],
})
export class AppModule { }
