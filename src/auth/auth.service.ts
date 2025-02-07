/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export interface UserProps {
    id: string,
    name: string,
    email: string,
    points: number
}


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

    ) { }

    async validateUser({ email, password }: LoginDto) {

        const user = await this.usersService.findUserByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const access_token = await this.login(user);
            return { access_token };
        }

        throw new UnauthorizedException("Acesso negado.");
    }

    async login(user: UserProps) {

        const access_token = this.jwtService.signAsync({
            email: user.email,
            sub: user.id
        },
            {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: 60 * 60 * 24
            }
        );

        return access_token;
    }

    async findMe(userId: string) {
        console.log(userId)
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) throw new NotFoundException('Conta não encontrada.');

        return user;
    }
}
