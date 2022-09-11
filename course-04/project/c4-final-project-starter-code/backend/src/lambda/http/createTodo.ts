
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createToDo } from '../../helper/todos'
import { createLogger } from "../../utils/logger";

const logger = createLogger('todos')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Create TODO event: ", JSON.stringify(event));
    const createTodoRequest: CreateTodoRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    
    const toDoItem = await createToDo(createTodoRequest, userId);
    logger.info("New TODO item: " + JSON.stringify(toDoItem))

    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    }
};