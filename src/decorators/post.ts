import { route } from './route'

export function Post(path: string = ''): MethodDecorator {
    return route('POST', path)
}
