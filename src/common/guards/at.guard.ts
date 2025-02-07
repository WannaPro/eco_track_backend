/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector,private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token não fornecido. Por favor, autentique-se.');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = this.jwtService.verify(token);
            
            // Verifica se o token expirou e retorna erro apropriado
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < currentTimestamp) {
                throw new UnauthorizedException('Token expirado. Por favor, faça login novamente.');
            }

            // Adiciona o payload decodificado ao objeto de solicitação para uso posterior
            request.user = payload;

            return true;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token expirado. Por favor, faça login novamente.');
            } else if (error instanceof UnauthorizedException) {
                throw error;
            } else {
                throw new UnauthorizedException('Token inválido. Por favor, autentique-se novamente.');
            }
        }
    }
}
