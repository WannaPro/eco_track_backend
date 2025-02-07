/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { Category } from '@prisma/client';
import { GetCurrentUserId } from '../common/decorators/index';
import { CreateDto } from './dto';
import { capitalazeFirstLetter } from '../functions/capitalazeFirstLetter';

@Controller('actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) { }

    @Post()
    async createAction(@GetCurrentUserId() userId: string, @Body() { title, description, category, points }: CreateDto) {
        return this.actionsService.create(userId, {
            title,
            description,
            category: capitalazeFirstLetter(category),
            points
        });
    }

    @Get()
    async findAll() {
        return this.actionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.actionsService.findOne(id);
    }

    @Put(':id')
    async updateOne(@Request() req, @Param('id') id: string, @Body() body: Partial<{ title: string; description: string; category: Category; points: number }>) {
        return this.actionsService.updateOne(id, req.user.userId, body);
    }

    @Delete(':id')
    async deleteOne(@Request() req, @Param('id') id: string) {
        return this.actionsService.deleteOne(id, req.user.userId);
    }
}
