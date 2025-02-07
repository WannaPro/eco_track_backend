/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
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
}
