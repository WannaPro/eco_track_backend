/* eslint-disable prettier/prettier */
import { Category } from "@prisma/client";

export default function calculatePoints(category: Category, quantity?: number): number {
    switch (category) {
        case 'Reciclagem':
            return quantity ? quantity * 5 : 5; // Exemplo: 1 kg de recicláveis = 5 pontos
        case 'Agua':
            return quantity ? Math.floor(quantity / 10) * 5 : 8; // 10 litros economizados = 5 pontos
        case 'Energia':
            return quantity ? Math.floor(quantity / 10) * 10 : 10; // 10 kWh economizados = 10 pontos
        case 'Mobilidade':
            return quantity ? Math.floor(quantity / 5) * 8 : 12; // 5 km sem carro = 8 pontos
        default:
            return 5; // Pontuação padrão
    }
}

