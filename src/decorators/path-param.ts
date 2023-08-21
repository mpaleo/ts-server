export function PathParam(name: string): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
        if (propertyKey && typeof propertyKey === 'string') {
            const handlerParams: any[] = Reflect.getMetadata('handlerPathParams', (target as any)[propertyKey]) || []

            handlerParams.push({
                type: 'PATH',
                parameterName: name,
                parameterIndex: parameterIndex,
                handlerName: propertyKey
            })

            Reflect.defineMetadata('handlerPathParams', handlerParams, (target as any)[propertyKey])
        }
    }
}
