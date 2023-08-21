import { MiddlewareDefinition } from '../interfaces/middleware-definition'

export function Before(middlewares: any[]): MethodDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }

        const middlewareDefinitions: MiddlewareDefinition[] = Reflect.getMetadata('beforeMiddlewares', target.constructor) || []

        middlewareDefinitions.push({
            middlewares,
            handlerName: propertyKey as string
        })

        Reflect.defineMetadata('beforeMiddlewares', middlewareDefinitions, target.constructor)
    }
}
