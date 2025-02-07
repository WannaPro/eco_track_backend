/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Public } from '../common/decorators/public.decorator';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }


    @Public()
    async create({ name, email, password }) {

        const emailAlreadyExists = await this.prisma.user.findUnique({
            where: { email }
        });

        if (emailAlreadyExists) throw new ConflictException('Email já existente.');

        const hashPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }
}
