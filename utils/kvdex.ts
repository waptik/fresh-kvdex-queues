import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"
import { kvdex, model, collection } from "https://deno.land/x/kvdex@v0.22.2/mod.ts"
import { zodModel } from "https://deno.land/x/kvdex@v0.21.0/ext/zod.ts"

export type IUser = z.infer<typeof UserModel>

const UserModel = z.object({
  username: z.string(),
  age: z.number(),
  activities: z.array(z.string()),
  address: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.number().nullable(),
  }).optional(),
})


export const kv = await Deno.openKv()

export const db = kvdex(kv, {
  numbers: collection(model<number>()),
  serializedStrings: collection(model<string>(), {
    serialize: "auto"
  }),
  users: collection(zodModel(UserModel), {
    history: true,
    indices: {
      username: "primary", // unique
      age: "secondary" // non-unique
    }
  }),
  // Nested collections
  nested: {
    strings: collection(model<string>()),
  }
})