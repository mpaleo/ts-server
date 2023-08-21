import { RouteDefinition } from '../interfaces/route-definition'

export function route(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD', path: string = ''): MethodDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }

        const routes: RouteDefinition[] = Reflect.getMetadata('routes', target.constructor)

        routes.push({
            method,
            path,
            handlerName: propertyKey as string
        })

        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}
