import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http'

import { router } from './utils/router'

export const runServer = (host: string, port: number): void => {
    const server: Server<typeof IncomingMessage, typeof ServerResponse> = createServer(router)

    server.listen(port, host, (): void => {
        console.log(`Server is running on http://${host}:${port}`)
    })
}
