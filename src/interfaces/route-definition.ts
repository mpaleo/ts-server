export interface RouteDefinition {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD'
    path: string
    handlerName: string
}
