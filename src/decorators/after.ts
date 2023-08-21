import { MiddlewareDefinition } from '../interfaces/middleware-definition'

export function After(middlewares: any[]): MethodDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }

        const middlewareDefinitions: MiddlewareDefinition[] = Reflect.getMetadata('afterMiddlewares', target.constructor) || []

        middlewareDefinitions.push({
            middlewares,
            handlerName: propertyKey as string
        })

        Reflect.defineMetadata('afterMiddlewares', middlewareDefinitions, target.constructor)
    }
}
