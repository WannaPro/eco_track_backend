/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class IdAcaoSustentavelDto {

    @ApiProperty({ example: 'UUID da ação sustentável' })
    @IsNotEmpty({ message: "O id da ação sustentável é obrigatório." })
    @IsString({ message: "O id da ação sustentável deve ser uma string." })
    id: string;
}
