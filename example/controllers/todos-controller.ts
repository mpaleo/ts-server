import { ControllerResponse } from '../../src/interfaces/controller-response'
import { AuthMiddleware } from '../middlewares/auth-middleware'
import { LogMiddleware } from '../middlewares/log-middleware'
import { Controller } from '../../src/decorators/controller'
import { Before } from '../../src/decorators/before'
import { After } from '../../src/decorators/after'
import { Get } from '../../src/decorators/get'
import { Post } from '../../src/decorators/post'
import { Put } from '../../src/decorators/put'
import { PathParam } from '../../src/decorators/path-param'
import { QueryParam } from '../../src/decorators/query-param'
import { Body } from '../../src/decorators/body'

@Controller('/teams/:teamId/todos')
export class TodosController {
    @Get()
    @Before([AuthMiddleware, LogMiddleware])
    @After([LogMiddleware])
    async getTodos(): Promise<ControllerResponse<any>> {
        console.log('Get todos route')

        return {
            statusCode: 200,
            body: { message: 'Example' }
        }
    }

    @Get('/:todoId')
    async getTodoById(
        @PathParam('teamId') teamId: number,
        @PathParam('todoId') todoId: number,
        @QueryParam('sort') sort: string
    ): Promise<ControllerResponse<any>> {
        console.log('Get todo by ID route', teamId, todoId, sort)

        return {
            statusCode: 200,
            body: { message: 'Example' }
        }
    }

    @Post()
    async createTodo(
        @Body() body: any
    ): Promise<ControllerResponse<any>> {
        console.log('Create todo route', body)

        return {
            statusCode: 201,
            body: { message: 'Example' }
        }
    }

    @Put('/:todoId')
    async updateTodo(
        @PathParam('todoId') todoId: number
    ): Promise<ControllerResponse<any>> {
        console.log('Update todo route', todoId)

        return {
            statusCode: 200,
            body: { message: 'Example' }
        }
    }
}
