import { IncomingMessage, ServerResponse } from 'node:http'

import { Data } from '../interfaces/data'
import { ControllerResponse } from '../interfaces/controller-response'

import { RouteHandler } from '../interfaces/route-handler'

export const controllerWrapper = async <T>(
    route: RouteHandler,
    request: IncomingMessage,
    response: ServerResponse,
    data: Data
): Promise<void> => {
    if (route.before) {
        for (const middleware of route.before) {
            await (new middleware().run(request, response))
        }
    }

    const body: any[] = Reflect.getMetadata('body', route.controller[route.handlerName]) || []

    const pathParams: any[] = Reflect.getMetadata('handlerPathParams', route.controller[route.handlerName]) || []

    const queryParams: any[] = Reflect.getMetadata('handlerQueryParams', route.controller[route.handlerName]) || []

    const sortedParams: any[] = body.concat(queryParams).concat(pathParams).sort(
        (a, b) => a.parameterIndex - b.parameterIndex
    ).map(p => {
        if (p.type === 'PATH') {
            return data.params[p.parameterName]
        } else if (p.type === 'QUERY') {
            return data.query[p.parameterName]
        } else {
            return data.body
        }
    })

    const result: ControllerResponse<T> = await route.controller[route.handlerName].apply(null, sortedParams)

    if (route.after) {
        for (const middleware of route.after) {
            await (new middleware().run(request, response))
        }
    }

    response.setHeader('Content-Type', 'application/json')
    response.writeHead(result.statusCode)
    response.end(JSON.stringify(result.body))
}
