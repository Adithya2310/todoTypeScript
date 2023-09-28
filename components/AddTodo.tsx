"use client"
import React,{useState} from 'react'
import Displaytodos from './Displaytodos';
import { useTodo } from '@/context';
import { todo } from 'node:test';

const AddTodo = () => {
    const [task, setTask] = useState("");

    // to fetch the function to add the todos
    const {handleAddTodos}=useTodo();

    // to set the value of task
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        // console.log(e.target);
        
        setTask(e.target.value);
    }
    // to handle the submit of the form
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        handleAddTodos(task);
        setTask("");
    }
  return (
    <div>
        <h1>Keep track of your Work</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    Add: 
                    <input type="text" placeholder="Enter some text" value={task} onChange={handleChange}/>
                    <button type='submit'>Add</button>
                </label>
            </form>
            <Displaytodos/>
        </div>
    </div>
  )
}

export default AddTodo