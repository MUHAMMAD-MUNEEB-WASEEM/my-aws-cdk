import addTodo from './addTodo';

import todos from './getTodo';



import Todo from './Todo';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todoId: string,
        todo: Todo
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case "addTodo":
            return await addTodo(event.arguments.todo);
        case "todos":
            return await todos();
        default:
            return null;
    }
}