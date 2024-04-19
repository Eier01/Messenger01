import NextAuth from "next-auth"

import { authOptions } from "@/app/utils/authOptions"

//interfece AuthOptions con esto indicamos el tipo de dato recibe authOptions

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}