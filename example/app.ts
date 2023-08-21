import 'reflect-metadata'

import { runServer } from '../src/server'
import { register } from '../src/utils/router'
import { TodosController } from './controllers/todos-controller'
import { TeamsController } from './controllers/teams-controller'

register([
    TeamsController,
    TodosController
], [], [])

runServer('localhost', 8000)
