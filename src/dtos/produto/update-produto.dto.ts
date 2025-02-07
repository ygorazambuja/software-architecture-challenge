import { z } from "zod";

export const updateProdutoSchema = z.object({
  nome: z.string(),
  preco: z.number(),
});

export type UpdateProdutoDto = z.infer<typeof updateProdutoSchema>;
