/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, HttpCode, HttpStatus, } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators/index';
import { CreateDto } from './dto';
import { capitalazeFirstLetter } from '../functions/capitalazeFirstLetter';
import { IdAcaoSustentavelDto } from './dto/id';
import { UpdateActionDto } from './dto/update';

@ApiTags('Ações Sustentáveis') // Define a seção no Swagger
@Controller('actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) { }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Criar uma nova ação sustentável' })
    @ApiResponse({ status: 201, description: 'Ação criada com sucesso.' })
    async createAction(@GetCurrentUserId() userId: string, @Body() { title, description, category, quantity }: CreateDto) {
        return this.actionsService.create(userId, {
            title,
            description,
            category: capitalazeFirstLetter(category),
            quantity
        });
    }

    @Get("my")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Listar todas as ações sustentáveis do usuário' })
    @ApiResponse({ status: 200, description: 'Lista de ações do usuário retornada com sucesso.' })
    async findMyActions(@GetCurrentUserId() userId: string) {
        return this.actionsService.findMyActions(userId);
    }

    @Get("")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Listar todas as ações sustentáveis' })
    @ApiResponse({ status: 200, description: 'Lista de ações retornada com sucesso.' })
    async findAll(@GetCurrentUserId() userId: string) {
        return this.actionsService.findAll(userId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Encontrar uma ação sustentável pelo id.' })
    @ApiResponse({ status: 200, description: 'Ação sustentável retornada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Ação não encontrada ou não pertence ao usuário' })
    async findOne(@Param() { id }: IdAcaoSustentavelDto) {
        return this.actionsService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Atualizar uma ação sustentável pelo id.' })
    @ApiResponse({ status: 200, description: 'Ação sustentável atualizada com sucesso.' })
    @ApiResponse({ status: 403, description: 'Utilizador não encontrado.' })
    @ApiResponse({ status: 404, description: 'Ação não encontrada ou não pertence ao usuário' })
    async updateOne(@GetCurrentUserId() userId: string, @Body() { title, description, category, quantity }: UpdateActionDto, @Param() { id }: IdAcaoSustentavelDto) {
        return this.actionsService.updateOne(
            userId,
            {
                title,
                description,
                category: capitalazeFirstLetter(category),
                quantity
            },
            id
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth() // Garante que o Swagger aceite o token JWT
    @ApiOperation({ summary: 'Deletar uma ação sustentável pelo id.' })
    @ApiResponse({ status: 200, description: 'Ação sustentável deletada com sucesso.' })
    @ApiResponse({ status: 403, description: 'Utilizador não encontrado.' })
    @ApiResponse({ status: 404, description: 'Ação não encontrada ou não pertence ao usuário' })
    async deleteOne(@GetCurrentUserId() userId: string, @Param() { id }: IdAcaoSustentavelDto) {
        return this.actionsService.deleteOne(id, userId);
    }
}
