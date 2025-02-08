/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { capitalazeFirstLetter } from '../functions/capitalazeFirstLetter';
import { GetCurrentUserId, Public } from '../common/decorators';

@ApiTags('Usuários') // Define a seção no Swagger
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post('')
    @ApiOperation({ summary: 'Criar um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({ status: 409, description: 'Email já existente.' })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name, email, password }: CreateUserDto) {
        return this.usersService.create({
            name: capitalazeFirstLetter(name),
            email: email.trim().toLowerCase(),
            password: password.trim(),
        });
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    @HttpCode(HttpStatus.OK)
    async findAll(@GetCurrentUserId() userId: string) {
        return this.usersService.findAll(userId);
    }
}
