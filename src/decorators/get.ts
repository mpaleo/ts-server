import { route } from './route'

export const Get = (path: string = ''): MethodDecorator => {
    return route('GET', path)
}
