import "dotenv/config"
import type { SignOptions } from "jsonwebtoken"

const secret = process.env.JWT_SECRET

if (!secret) {
  throw new Error("JWT_SECRET não foi definida. Configure o arquivo .env da API.")
}

export const authConfig = {
  jwt: {
    secret,
    expiresIn: "1d" as SignOptions["expiresIn"],
  },
}
