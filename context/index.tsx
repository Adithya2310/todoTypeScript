"use client"
import { ReactNode, createContext, useContext, useState } from "react";



// To use the localStorage
// 1. we need to se the state in local sotrage everytime we modify the data
// 2. we need to get the initial state to from the local storage
// 3. we need to take care of the type conversion to string and then back to the json format
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
    // so that we can get the todos from the lcoalstorage
    const [todos, setTodos] = useState<Todo[]>(()=>{
        const storedTodos=localStorage.getItem("todos");
        if(storedTodos==null)
        {
            return [];
        }
        else{
            return JSON.parse(storedTodos);
        }
    });
    // We need to get the count form the local storage
    const [count,setCount]=useState(()=>{
        const storedCount=localStorage.getItem('count');
        if(storedCount==null)
        {
            return 0;
        }
        else{
            return parseFloat(storedCount);
        }
    });

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
            localStorage.setItem("todos",JSON.stringify(newTodo));
            setCount(()=>{
                return count+1;
            });
            localStorage.setItem("count",count.toString());
            return newTodo;
        });

    }

    // to handle the checkbox in the todo
    const handleCompleteTodo=(id:number)=>{
        setTodos((prev)=>{
            const newTodos=(prev.map((task)=>{
                return (task.id===id)?{...task,status:!task.status}:task;
            }));
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos
        })
    }

    // to handle the delete todo function
    const handleDeleteTodo=(id:number)=>{
        console.log(id);
        
        setTodos((prev)=>{
            const newTodos= (prev.filter((task)=>{
                return task.id!=id;
            }))
            localStorage.setItem("todos",JSON.stringify(newTodos));
            return newTodos
        });
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