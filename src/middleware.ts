import { sequence } from "astro:middleware"
import { handleAdminRedirect } from "./middleware/admin"
import { handleAuth } from "./middleware/auth"

export const onRequest = sequence(handleAuth, handleAdminRedirect)
