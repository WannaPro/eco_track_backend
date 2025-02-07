/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { UsersService } from './users.service';
import { CreateDto } from './dto';
import { capitalazeFirstLetter } from '../functions/capitalazeFirstLetter';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post('')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() { name, email, password }: CreateDto) {
        return this.usersService.create({
            name: capitalazeFirstLetter(name),
            email: email.trim().toLowerCase(),
            password: password.trim(),
        });
    }
    
    @Get('/')
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.usersService.findAll()
    }

}
