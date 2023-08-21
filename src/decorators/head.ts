import { route } from './route'

export function Head(path: string = ''): MethodDecorator {
    return route('HEAD', path)
}
