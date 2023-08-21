export function Body(): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
        if (propertyKey && typeof propertyKey === 'string') {
            const body: any[] = [{
                type: 'BODY',
                parameterIndex: parameterIndex
            }]

            Reflect.defineMetadata('body', body, (target as any)[propertyKey])
        }
    }
}
