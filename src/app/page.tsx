'use client'

import { useState, useEffect } from 'react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [mounted, setMounted] = useState(false)

  // LocalStorageから読み込み
  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) {
      setTodos(JSON.parse(stored))
    }
    setMounted(true)
  }, [])

  // LocalStorageに保存
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    }
    setTodos([newTodo, ...todos])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length

  const emptyMessage = filter === 'all'
    ? 'No tasks yet'
    : filter === 'active'
      ? 'No active tasks'
      : 'No completed tasks'

  if (!mounted) return null

  return (
    <div className="container">
      <h1>Todo</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Done'}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-message">{emptyMessage}</li>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="todo-footer">
        <span>{activeCount} of {todos.length} tasks</span>
        <button className="clear-btn" onClick={clearCompleted}>
          Clear done
        </button>
      </div>
    </div>
  )
}
