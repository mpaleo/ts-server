import { route } from './route'

export function Delete(path: string = ''): MethodDecorator {
    return route('DELETE', path)
}
