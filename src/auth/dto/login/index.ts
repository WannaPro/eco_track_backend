/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsString({ message: "O email deve ser uma string." })
    @IsEmail(undefined, { message: "O email deve ser um email." })
    email: string;

    //@Min(5, { message: "A palava-passe deve ter pelo menos 5 caracteres." })
    @IsNotEmpty({ message: "A palava-passe é obrigatória." })
    @IsString({ message: "A palavra-passe deve ser uma string." })
    password: string;
}
