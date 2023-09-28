"use client"
import { ReactNode, createContext, useContext, useState } from "react";


export type Todo={
    id:number;
    todo:string;
    status:boolean;
    date: Date;
}

// define the type for the context
export type TodoContextType={
    handleAddTodos:(todo:string)=>void;
    todos:Todo[];
    handleCompleteTodo:(id:number)=>void;
    handleDeleteTodo:(id:number)=>void;
}


export const TodoContext=createContext<TodoContextType|null>( null);

export const TodoContextProvider=({children}:{children:ReactNode})=>{
    const [todos, setTodos] = useState<Todo[]>([]);
    const [count,setCount]=useState(0);

    // to add the todos to the list tof todos
    const handleAddTodos:(todo:string)=>void=(todo:string)=>{
        setTodos((prev)=>{
            // console.log(prev);
            
            const newTodo= [{
                id:count,
                todo:todo,
                status:false,
                date: new Date()
            },...prev]
            return newTodo;
        });
        setCount(count+1);
    }

    // to handle the checkbox in the todo
    const handleCompleteTodo=(id:number)=>{
        setTodos((prev)=>{
            return (prev.map((task)=>{
                return (task.id===id)?{...task,status:!task.status}:task;
            }));
        })
    }

    // to handle the delete todo function
    const handleDeleteTodo=(id:number)=>{
        console.log(id);
        
        setTodos((prev)=>{
            return (prev.filter((task)=>{
                return task.id!=id;
            }))
        })
    }

    return (
        <TodoContext.Provider value={{handleAddTodos,todos,handleCompleteTodo,handleDeleteTodo}}>
            {children}
        </TodoContext.Provider>
    ) 
}

// export the useTodo hook
export const useTodo=()=>{
    const todoContextValue=useContext(TodoContext);
    if(!todoContextValue)
    {
        throw new Error("Please pass the provider");
    }
    return todoContextValue
}