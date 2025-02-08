/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsEnum, IsInt, Min } from "class-validator";
import { Category } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDto {


    @ApiProperty({ example: 'Economizei 10 litros de água' })
    @IsNotEmpty({ message: "O título é obrigatório." })
    @IsString({ message: "O título deve ser uma string." })
    title: string;

    @ApiProperty({ example: 'Fechei a torneira enquanto escovava os dentes.' })
    @IsNotEmpty({ message: "A descrição é obrigatório." })
    @IsString({ message: "A descrição deve ser uma string." })
    description: string;

    @ApiProperty({ example: 'Agua', enum: ['Reciclagem', 'Energia', 'Água', 'Mobilidade'] })
    @IsNotEmpty({ message: "A categoria é obrigatória." })
    @IsEnum(Category, { message: `A categoria deve ser uma das seguintes opções: ${Object.values(Category).join(', ')}` })
    category: Category;

    @ApiProperty({ example: 10, description: 'Pontos obtidos com a ação' })
    @IsNotEmpty({ message: "A pontuação é obrigatória." })
    @IsInt({ message: "A pontuação deve ser um número." })
    @Min(1) // Evita pontos negativos ou zero
    points: number
}
