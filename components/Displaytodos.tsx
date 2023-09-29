"use client"
import { Todo, useTodo } from "@/context";
import { TodoContext } from "@/context";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Displaytodos = () => {

    const {todos,handleCompleteTodo,handleDeleteTodo}=useTodo();
    const searchParams=useSearchParams();
    const query=searchParams.get('todos');
    // const [filteredTodos,setFilteredTodos]=useState(todos);
    let filteredTodos=todos;
    if(query=='active')
    {
        filteredTodos=filteredTodos.filter((todo)=>{
            return todo.status===false;
        })
    }
    else if(query=='completed')
    {
        filteredTodos=filteredTodos.filter((todo)=>{
            return todo.status===true;
        })
    }
    
    // console.log(todos);
    
  return (
    <div>
        <ul>
            {filteredTodos.map((todo:Todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`task-${todo.id}`} checked={todo.status} onChange={()=>handleCompleteTodo(todo.id)}/>
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