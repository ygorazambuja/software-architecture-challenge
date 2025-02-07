import { z } from "zod";

export const updateClienteSchema = z.object({
  nome: z.string().nonempty(),
  email: z.string().email(),
});

export type UpdateClienteDto = z.infer<typeof updateClienteSchema>;
