import 'source-map-support/register';
import { getUserId } from '../utils';
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteTodo} from "../../helper/todos";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing Event ", event);
    

    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);

    await deleteTodo(todoId, userId);

    return {
        statusCode: 200,
        body: ""
    }
};
