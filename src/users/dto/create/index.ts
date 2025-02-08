/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'João Batista' })
    @IsNotEmpty({ message: "O nome é obrigatório." })
    @IsString({ message: "O nome deve ser uma string." })
    name: string;

    @ApiProperty({ example: 'email_usuario@exemplo.com' })
    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsString({ message: "O email deve ser uma string." })
    @IsEmail(undefined, { message: "O email deve ser um email." })
    email: string;

    @ApiProperty({ example: 'senha_usuario' })
    @IsNotEmpty({ message: "A palava-passe é obrigatória." })
    @IsString({ message: "A palavra-passe deve ser uma string." })
    password: string;
}
