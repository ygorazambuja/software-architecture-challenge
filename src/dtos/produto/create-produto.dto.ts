import { z } from "zod";

export const createProdutoSchema = z.object({
  nome: z.string(),
  preco: z.number(),
});

export type CreateProdutoDto = z.infer<typeof createProdutoSchema>;
