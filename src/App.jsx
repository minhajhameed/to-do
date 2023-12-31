import React, { useState } from 'react'
import './styles.css'

const App = () => {
  const [newItem, setNewitem] = useState("")
  const [todos, setTodos] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewitem("")
    
  }

  const toggleTodo = (id, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo;
      })
    })
  }


  const deleteTodo = (id) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={newItem} onChange={e => setNewitem(e.target.value)}  type="text" id="item" />
      </div>
      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>To-Do List</h1>
    <ul className='list'>
    {todos.length == 0 && "No Tasks"}
    {todos.map(todo => {
      return (

      <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
          {todo.title}
        </label>
        <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>

      )
    })}
    </ul>
    </>
  )
}

export default App