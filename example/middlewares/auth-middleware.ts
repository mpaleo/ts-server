import { IncomingMessage, ServerResponse } from 'node:http'

import { Middleware } from '../../src/interfaces/middleware'

export class AuthMiddleware implements Middleware {
    async run(request: IncomingMessage, response: ServerResponse): Promise<void> {
        console.log('Auth middleware running ...')
    }
}
