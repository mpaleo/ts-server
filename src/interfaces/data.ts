import { ParsedUrlQuery } from 'node:querystring'

export interface Data {
    params: { [key: string]: string }
    query: ParsedUrlQuery
    body: any
}
