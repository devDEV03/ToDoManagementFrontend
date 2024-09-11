import React, { useState, useEffect } from 'react'
import { completeTodo, deleteTodo, getAllTodos, incompleteTodo } from '../services/ToDoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService';

function ListTodoComponent() {
    const [todos,setTodos] = useState([])

    const navigate = useNavigate()
    
    const isAdmin = isAdminUser();

    useEffect(() => {
        listTodos();
     }, [])
  
     function listTodos() {
        getAllTodos().then((response) => {
          setTodos(response.data);
      }).catch(error => {
          console.error(error);
      })
     }

     function addNewTodo(){
        navigate('/add-todo')
     }

     function updateTodo(id){
        console.log(id);
        navigate(`/update-todo/${id}`)
        
     }

     function deleteTodos(id){
        deleteTodo(id).then(() => {
            listTodos();
            console.log("Todo deleted");
        }).catch(
            error => {
                console.error(error);
                
            }
        )
     }

     function markcompleteTodo(id){
        completeTodo(id).then(() => {
            listTodos();
            console.log("Todo Completed");
        }).catch(
            error => {
                console.error(error);
                
            }
        )
     }

     function markincompleteTodo(id){
        incompleteTodo(id).then(() => {
            listTodos();
            console.log("Todo Incompleted");
        }).catch(
            error => {
                console.error(error);
                
            }
        )
     }
  return (
    <div className='container'>
        <h2 className='text-center'>List of Todos</h2>
        {
            isAdmin &&
            <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        }
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'Yes' : 'No'}</td>
                                <td>
                                    {
                                        isAdmin &&
                                        <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>

                                    }
                                    {
                                        isAdmin &&
                                        <button className='btn btn-danger' onClick={() => deleteTodos(todo.id)} style={{margin : "10px"}}>Delete</button>

                                    }
                                    <button className='btn btn-success' onClick={() => markcompleteTodo(todo.id)} style={{margin : "10px"}}>Complete</button>
                                    <button className='btn btn-info' onClick={() => markincompleteTodo(todo.id)} style={{margin : "10px"}}>Incomplete</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListTodoComponent
