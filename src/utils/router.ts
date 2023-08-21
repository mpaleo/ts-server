import { IncomingMessage, ServerResponse } from 'node:http'
import { parse } from 'node:querystring'

import { controllerWrapper } from './controller-wrapper'
import { Data } from '../interfaces/data'
import { RouteHandler } from '../interfaces/route-handler'
import { RouteDefinition } from '../interfaces/route-definition'
import { MiddlewareDefinition } from '../interfaces/middleware-definition'

const registeredRoutes: RouteHandler[] = []
let registeredBeforeMiddlewares: any[] = []
let registeredAfterMiddlewares: any[] = []

export const register = (controllers: any[], before?: any[], after?: any[]): void => {
    if (before) registeredBeforeMiddlewares = before

    if (after) registeredAfterMiddlewares = after

    for (const controller of controllers) {
        const instance = new controller()
        const prefix: string = Reflect.getMetadata('prefix', controller)
        const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller)
        const beforeMiddlewareDefinitions: MiddlewareDefinition[] = Reflect.getMetadata('beforeMiddlewares', controller)
        const afterMiddlewareDefinitions: MiddlewareDefinition[] = Reflect.getMetadata('afterMiddlewares', controller)

        for (const route of routes) {
            const beforeMiddlewares: any[] = beforeMiddlewareDefinitions ? beforeMiddlewareDefinitions
                .filter(m => m.handlerName === route.handlerName)
                .map(m => m.middlewares)
                .flat() : []

            const afterMiddlewares: any[] = afterMiddlewareDefinitions ? afterMiddlewareDefinitions
                .filter(m => m.handlerName === route.handlerName)
                .map(m => m.middlewares)
                .flat() : []

            registeredRoutes.push({
                method: route.method,
                path: prefix + route.path,
                controller: instance,
                handlerName: route.handlerName,
                before: beforeMiddlewares,
                after: afterMiddlewares
            })
        }
    }
}

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    let buffer: string = ''

    request.setEncoding('utf-8')

    request.on('data', (chunk: string): void => {
        buffer += chunk
    })

    request.on('end', async (): Promise<void> => {
        const verb: string | undefined = request.method
        const requestedRoute: string | undefined = request.url

        if (!verb || !requestedRoute) {
            response.writeHead(400)
            response.end('Bad request')

            return
        }

        for (const route of registeredRoutes) {
            if (route.method === verb) {
                const requestedRouteSplit: string[] = requestedRoute.split('?')[0].split('/').filter(r => r)
                const routeSplit: string[] = route.path.split('/').filter(r => r)

                if (requestedRouteSplit.length === routeSplit.length) {
                    const data: Data = { params: {}, query: {}, body: undefined }
                    const containsParameters: boolean = route.path.includes(':')

                    let match: boolean = true

                    for (let i = 0; i < routeSplit.length; i++) {
                        if (containsParameters && routeSplit[i].startsWith(':')) {
                            data.params[routeSplit[i].substring(1)] = requestedRouteSplit[i]
                            continue
                        }

                        if (routeSplit[i] !== requestedRouteSplit[i]) {
                            match = false
                            break
                        }
                    }

                    if (match) {
                        if (requestedRoute.includes('?')) {
                            data.query = parse(requestedRoute.split('?')[1])
                        }

                        if (verb === 'POST') {
                            try {
                                data.body = JSON.parse(buffer)
                            } catch (ex) {
                                response.writeHead(400)
                                response.end('Bad request')

                                return
                            }
                        }

                        for (const middleware of registeredBeforeMiddlewares) {
                            await (new middleware().run(request, response))
                        }

                        await controllerWrapper(route, request, response, data)

                        for (const middleware of registeredAfterMiddlewares) {
                            await (new middleware().run(request, response))
                        }

                        break
                    }
                }
            }
        }
    })
}
