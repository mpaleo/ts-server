import { route } from './route'

export function Put(path: string = ''): MethodDecorator {
    return route('PUT', path)
}
