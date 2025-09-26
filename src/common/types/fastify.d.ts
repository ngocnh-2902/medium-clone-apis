import 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        lang?: string;
        locals: {
            token: string | undefined
            isAuthenticated: boolean
            isUnauthenticated: boolean
            validatedQueryParams?: Record<string, any>
        }
    }
}