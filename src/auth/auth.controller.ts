/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@ApiTags('Autenticação') // Define a seção no Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('')
    @ApiOperation({ summary: 'Logar um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário logado com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado.' })
    @HttpCode(HttpStatus.OK)
    validateUser(@Body() { email, password }: LoginDto) {
        return this.authService.validateUser({
            email: email.trim().toLowerCase(),
            password: password.trim(),
        });
    }

    @Get('/detail/me')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Detalhes de um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Conta não encontrada.' })
    async findMe(@GetCurrentUserId() userId: string) {
        return this.authService.findMe(userId);
    }
}
