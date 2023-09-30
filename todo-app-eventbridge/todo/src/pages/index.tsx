import React, { useRef } from "react"
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag';
import "./style.css"
import shortid from "shortid";

const GET_ALL_TODOS = gql`
{
  todos {
    id
    description
  }
}
`;

const ADD_TODO = gql`
  mutation addTodo($todo: TodoInput!){
    addTodo(todo: $todo){
      result
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const { refetch } = useQuery(GET_ALL_TODOS)

  let taskField:any;
  const addTask = ()=>{
    addTodo({
      variables: {
        todo: {
          id : shortid.generate(),
          description : taskField.value
        }
      },
      refetchQueries: () => [{ query: GET_ALL_TODOS }]
    })
    taskField.value = "";

  }

  if (loading)
    return <h3>Loading..</h3>

  if (error)
    return <h3>Error</h3>

  return (
    <div className='app-container'>
    <h2 className='app-header'>Add Todo</h2>
    <label >
      <input className='task-input' type="text"
        placeholder="Enter Todo"
        ref={node => { taskField = node}}
        required={true} />
      
    </label>
    <button className='submit-task' onClick={addTask}>+</button>

    <h2 className='my-Todo'>My Todos</h2>
    <div >
        {data?.todos.map((td)=> {
          return <div className='task-list-item' key={td.id}>
            {td.description}
          </div>
          })}
      </div>
  </div>
  );
}
