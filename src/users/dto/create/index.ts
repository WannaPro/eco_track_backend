/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsEmail, IsString, Min } from "class-validator";

export class CreateDto {

    @IsNotEmpty({ message: "O nome é obrigatório." })
    @IsString({ message: "O nome deve ser uma string." })
    name: string;

    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsString({ message: "O email deve ser uma string." })
    @IsEmail(undefined, { message: "O email deve ser um email." })
    email: string;

    //@Min(5, { message: "A palava-passe deve ter pelo menos 6 caracteres." })
    @IsNotEmpty({ message: "A palava-passe é obrigatória." })
    @IsString({ message: "A palavra-passe deve ser uma string." })
    password: string;
}
