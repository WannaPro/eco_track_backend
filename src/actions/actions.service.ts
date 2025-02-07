/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Action } from '@prisma/client';


// Definição do Enum
enum Category {
    Reciclagem = 'Reciclagem',
    Energia = 'Energia',
    Agua = 'Agua',
    Mobilidade = 'Mobilidade',
}

@Injectable()
export class ActionsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, { title, description, category, points }): Promise<Action> {

        // Verifica se a categoria é válida
        if (!Object.values(Category).includes(category)) {
            throw new BadRequestException(`Categoria inválida: ${category}. As opções válidas são: ${Object.values(Category).join(', ')}`);
        }
        
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) throw new NotFoundException('Utilizador não encontrado.');

        const action = await this.prisma.action.create({
            data: {
                title,
                description,
                category,
                points,
                userId,
            },
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                points: {
                    increment: points
                }
            },
        });

        return action;
    }

    async findAll(): Promise<Action[]> {
        return this.prisma.action.findMany({ include: { user: true } });
    }

    async findOne(id: string): Promise<Action> {
        const action = await this.prisma.action.findUnique({ where: { id }, include: { user: true } });
        if (!action) throw new NotFoundException('Ação não encontrada');
        return action;
    }

    async updateOne(id: string, userId: string, data: Partial<Action>): Promise<Action> {
        const action = await this.prisma.action.findUnique({ where: { id } });
        if (!action || action.userId !== userId) throw new NotFoundException('Ação não encontrada ou não pertence ao usuário');

        return this.prisma.action.update({
            where: { id },
            data,
        });
    }

    async deleteOne(id: string, userId: string): Promise<void> {
        const action = await this.prisma.action.findUnique({ where: { id } });
        if (!action || action.userId !== userId) throw new NotFoundException('Ação não encontrada ou não pertence ao usuário');

        await this.prisma.user.update({
            where: { id: userId },
            data: { points: { decrement: action.points } },
        });

        await this.prisma.action.delete({ where: { id } });
    }
}
