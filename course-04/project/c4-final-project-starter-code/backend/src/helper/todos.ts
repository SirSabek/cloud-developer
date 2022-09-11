import { TodoItem } from '../models/TodoItem';
import { parseUserId } from "../auth/utils";
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { createLogger } from '../utils/logger'

import {
    getTodoItemsPerUser,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
    generateUploadUrlItem} from '../helper/todosAccess'

const uuidv4 = require('uuid/v4');
const logger = createLogger('todos')


export async function createToDo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const userId = parseUserId(jwtToken);
    const todoId =  uuidv4();
    const s3BucketName = process.env.S3_BUCKET;
    
    return createTodoItem({
        userId: userId,
        todoId: todoId,
        attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}


export async function deleteTodo(userId: string, todoId: string): Promise<void> {
    logger.info('Delete Todo Item: ', {userId: userId, todoId: todoId})
    return deleteTodoItem(userId, todoId)
  }

export async function updateTodo(userId: string, todoId: string, updateTodoRequest: UpdateTodoRequest): Promise<TodoItem> {
    logger.info('Update Todo Item: ', {userId: userId, todoId: todoId, updateTodoRequest: updateTodoRequest})
    return updateTodoItem(userId, todoId, updateTodoRequest);
}

export async function getAllToDo(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return getTodoItemsPerUser(userId);
}

export async function generateUploadUrl(todoId: string): Promise<string> {
    return generateUploadUrlItem(todoId);
}
