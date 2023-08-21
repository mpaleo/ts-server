export function QueryParam(name: string): ParameterDecorator {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void => {
        if (propertyKey && typeof propertyKey === 'string') {
            const handlerQueryParams: any[] = Reflect.getMetadata('handlerQueryParams', (target as any)[propertyKey]) || []

            handlerQueryParams.push({
                type: 'QUERY',
                parameterName: name,
                parameterIndex: parameterIndex,
                handlerName: propertyKey
            })

            // @ts-ignore
            Reflect.defineMetadata('handlerQueryParams', handlerQueryParams, (target as any)[propertyKey])
        }
    }
}
