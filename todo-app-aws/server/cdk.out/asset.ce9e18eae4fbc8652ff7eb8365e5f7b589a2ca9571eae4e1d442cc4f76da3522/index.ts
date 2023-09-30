import addTodo from './addTodo';
import deleteTodo from './deleteTodo';

import todos from './getTodo';



import Todo from './Todo';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todo: Todo,
        id: string
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case "addTodo":
            return await addTodo(event.arguments.todo);
        case "deleteTodo":
            return await deleteTodo(event.arguments.id);
        case "todos":
            return await todos();
        default:
            return null;
    }
}