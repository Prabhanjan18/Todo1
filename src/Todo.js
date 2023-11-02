import { useState,useEffect } from 'react';
import './App.css';
import axios from "axios";
function Todo() {
  const [todo,setTodo] = useState([]);
  const [newtodo,setNewtodo] = useState('');

  async function getPosts(){
    const url = "https://jsonplaceholder.typicode.com/todos";
    const res = await axios.get(url)
    setTodo(res.data)
    console.log(res.data)
  }

  useEffect(() =>{ 
    getPosts()},[])
   
  async function add(){
    try{
      const url = "https://jsonplaceholder.typicode.com/todos";
      const response = await axios.post(url,newtodo)
      setTodo([...todo,response.data])
      setNewtodo("")
    }
    catch(error){
      console.log("error:",error)
    }
  }

  async function update(id,updatedTodo){
    try{
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,updatedTodo);
      const updatedTodos = todo.map((t) =>
        t.id === id ? { ...t, ...updatedTodo } : t
      );
      setTodo(updatedTodos)
    }
    catch(error){
      console.error("Error updating todo:", error);
    }
  }

  async function deleteTodo(id){
      try{
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const updatedTodos = todo.filter((t) => t.id !== id);
        setTodo(updatedTodos);
      }catch (error) {
        console.error("Error deleting todo:", error);
      }
    }


  return (
    <div className="App">
      <h2>Todo List</h2>
      <input type="text" value={newtodo} onChange={(e)=> setNewtodo(e.target.value)}/>
      <button onClick={add}>Add Todo</button>
      <div className='todo'>
      <ul className='list-group'>
        {todo.map((t) => (
          <li className="list-group-item" key={t.id}>
            {t.title}
            <button className="btn btn-primary border border-dark" onClick={() => update(t.id, { completed: !t.completed })}>
              {t.completed ? "Done" : "Not Done"}
            </button>
            <button className="btn btn-primary border border-dark" onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Todo;
