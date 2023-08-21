export interface RouteHandler {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD'
    path: string
    controller: any
    handlerName: string
    before?: any[] | undefined
    after?: any[] | undefined
}
