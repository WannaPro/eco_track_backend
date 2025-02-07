/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { GetCurrentUserId, Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('')
    @HttpCode(HttpStatus.CREATED)
    validateUser(@Body() { email, password }: LoginDto) {
        return this.authService.validateUser({
            email: email.trim().toLowerCase(),
            password: password.trim(),
        });
    }

    @Get('/detail/me')
    async findMe(@GetCurrentUserId() userId: string) {
        return this.authService.findMe(userId);
    }
}
