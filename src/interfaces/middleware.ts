import { IncomingMessage, ServerResponse } from 'node:http'

export interface Middleware {
    run: (request: IncomingMessage, response: ServerResponse) => Promise<void>
}
