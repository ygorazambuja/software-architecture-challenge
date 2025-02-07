import { z } from "zod";

export const createClienteSchema = z.object({
  nome: z.string().nonempty(),
  email: z.string().email(),
});

export type CreateClienteDto = z.infer<typeof createClienteSchema>;
