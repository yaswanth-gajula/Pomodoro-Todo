import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';

export default function TodoList({ mode }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const userEmail = localStorage.getItem('user_email') || 'user';

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${userEmail}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [userEmail]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
  }, [todos, userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Container>
      <Card className={`shadow-sm border-0 bg-dark ${mode === 'break' ? 'card-break' : 'card-work'}`}>
        <Card.Body>
          <Card.Title>
            <h3 className={`mb-4 ${mode === 'work' ? 'text-primary' : 'text-success'}`}>
              📝 Task List
            </h3>
          </Card.Title>
          
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="me-2 rounded-pill bg-dark text-light border-secondary"
              />
              <Button 
                type="submit" 
                variant={mode === 'work' ? 'primary' : 'success'}
                className="rounded-circle d-flex align-items-center justify-content-center btn-glow"
                style={{ width: '40px', height: '40px' }}
              >
                <FaPlus />
              </Button>
            </Form.Group>
          </Form>

          <ListGroup variant="flush">
            {todos.map(todo => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center border-0 border-bottom border-secondary py-3 bg-transparent"
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={`me-3 checkbox-${mode}`}
                  />
                  <span style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#6c757d' : '#fff',
                    transition: 'all 0.3s ease'
                  }}>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="rounded-circle d-flex align-items-center justify-content-center opacity-75 hover-opacity-100"
                  style={{ width: '32px', height: '32px' }}
                >
                  <FaTrash size={12} />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {todos.length === 0 && (
            <div className="text-center text-muted mt-4 py-5">
              <p className="mb-0">No tasks yet. Add some tasks to get started!</p>
            </div>
          )}
        </Card.Body>
      </Card>
      <style>
        {`
          .hover-opacity-100:hover {
            opacity: 1 !important;
          }
          .form-check-input:checked {
            background-color: ${mode === 'work' ? '#3f8cff' : '#2fb344'};
            border-color: ${mode === 'work' ? '#3f8cff' : '#2fb344'};
            transition: all 0.3s ease;
          }
          .form-check-input {
            cursor: pointer;
            background-color: transparent;
            border-color: #6c757d;
          }
          .form-check-input:not(:checked):hover {
            border-color: ${mode === 'work' ? '#3f8cff' : '#2fb344'};
          }
          .card {
            transition: all 0.3s ease;
          }
          .card-work {
            background-color: #212529 !important;
            border: 1px solid #2c3034 !important;
          }
          .card-break {
            background-color: #1a2a1f !important;
            border: 1px solid #2c3034 !important;
          }
          .checkbox-break:checked {
            background-color: #2fb344 !important;
            border-color: #2fb344 !important;
          }
          .checkbox-work:checked {
            background-color: #3f8cff !important;
            border-color: #3f8cff !important;
          }
          .btn-glow:hover {
            box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.5);
          }
          .form-control:focus {
            background-color: #2c3034;
            color: #fff;
            border-color: ${mode === 'work' ? '#3f8cff' : '#2fb344'};
            box-shadow: 0 0 0 0.25rem ${mode === 'work' ? 'rgba(63, 140, 255, 0.25)' : 'rgba(47, 179, 68, 0.25)'};
          }
        `}
      </style>
    </Container>
  );
} 