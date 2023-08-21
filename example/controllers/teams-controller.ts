import { ControllerResponse } from '../../src/interfaces/controller-response'
import { Controller } from '../../src/decorators/controller'
import { Get } from '../../src/decorators/get'

@Controller('/teams')
export class TeamsController {
    @Get()
    async getTeams(): Promise<ControllerResponse<any>> {
        console.log('Get teams route')

        return {
            statusCode: 200,
            body: { message: 'Example' }
        }
    }
}
