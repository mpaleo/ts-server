import { route } from './route'

export function Options(path: string = ''): MethodDecorator {
    return route('OPTIONS', path)
}
