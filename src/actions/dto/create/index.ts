/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsEnum, IsInt, Min } from "class-validator";
import { Category } from '@prisma/client';

export class CreateDto {

    @IsNotEmpty({ message: "O título é obrigatório." })
    @IsString({ message: "O título deve ser uma string." })
    title: string;

    @IsNotEmpty({ message: "A descrição é obrigatório." })
    @IsString({ message: "A descrição deve ser uma string." })
    description: string;

    @IsNotEmpty({ message: "A categoria é obrigatória." })
    @IsEnum(Category, { message: `A categoria deve ser uma das seguintes opções: ${Object.values(Category).join(', ')}` })
    category: Category;

    @IsNotEmpty({ message: "A pontuação é obrigatória." })
    @IsInt({ message: "A pontuação deve ser um número." })
    @Min(1) // Evita pontos negativos ou zero
    points: number
}
