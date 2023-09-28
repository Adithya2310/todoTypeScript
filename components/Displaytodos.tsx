"use client"
import { Todo, useTodo } from "@/context";
import { TodoContext } from "@/context";

const Displaytodos = () => {

    const {todos,handleCompleteTodo,handleDeleteTodo}=useTodo();
    // console.log(todos);
    
  return (
    <div>
        <ul>
            {todos.map((todo:Todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`task-${todo.id}`} onChange={()=>handleCompleteTodo(todo.id)}/>
                    <label htmlFor={`task-${todo.id}`}>{todo.todo}</label>
                    {todo.status
                    &&
                    <button onClick={()=>handleDeleteTodo(todo.id)}>delete</button>
                    }
                </li>
            })}
        </ul>
    </div>
  )
}

export default Displaytodos