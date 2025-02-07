import { z } from "zod";
import { CreatePedidoDto } from "./create-pedido.dto";
import { UpdatePedidoDto } from "./update-pedido.dto";

export const createPedidoSchema = z.object({
  cliente: z.number().min(1, "Cliente ID must be a positive number"),
  produto: z.number().min(1, "ID do produto tem que ser positivo"),
  // Add other properties as needed
});

export const updatePedidoSchema = z.object({
  cliente: z.number().optional(),
  produto: z.number().optional(),
  pedidoId: z.number().optional(),
});
