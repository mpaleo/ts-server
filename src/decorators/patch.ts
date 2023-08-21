import { route } from './route'

export function Patch(path: string = ''): MethodDecorator {
    return route('PATCH', path)
}
