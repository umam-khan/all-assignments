import React, { useState } from 'react';
import EditTodo from './EditTodo';

const TodoForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = () => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("added")
        const newTodos = [...props.todos, data];
        props.setTodos(newTodos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
    <div className='TodoForm'>
      <input type="text" className='todo-input' id="title" placeholder='task name' onChange={(e) => setTitle(e.target.value)} />

      <input type="text" className='todo-input' id="description" placeholder='What are we doing?' onChange={(e) => setDescription(e.target.value)} />

      <button onClick={addTodo} className='todo-btn'>Add Todo</button>
      </div>
    </>
  );
};

export default TodoForm;
