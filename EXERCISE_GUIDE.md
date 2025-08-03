# 🎯 Frontend Learning Exercise - Step by Step Guide

Welcome to the **Frontend Learning Exercise**! This guide will walk you through building a complete React application with Next.js, Redux Toolkit, and Tailwind CSS from scratch.

## 🚀 Getting Started

### Step 1: Initialize the Project

1. **Navigate to the exercise directory:**
   ```bash
   cd counter-todolist-exercice-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:3000`

You should see a page with a header, footer, and two placeholder sections for Counter and Todo List components.

---

## 📝 Phase 1: Project Setup & Basic Structure

### Task 1.1: Explore the Current Setup ✅ (Already Done)

The project is already set up with:
- ✅ Next.js with TypeScript
- ✅ Tailwind CSS
- ✅ Redux Toolkit and React Redux
- ✅ ESLint and Prettier
- ✅ Basic file structure
- ✅ TypeScript types defined
- ✅ Basic Redux store configuration

### Task 1.2: Understand the File Structure ✅ (Already Done)

The following directories and files are already created:
- ✅ `app/` - App CSS, layout and basic page
- ✅ `src/components/` - React components
- ✅ `src/store/` - Redux store configuration
- ✅ `src/reducers/` - Redux reducers (empty)
- ✅ `src/hooks/` - Custom React hooks (empty)
- ✅ `src/types/` - TypeScript type definitions
- ✅ `src/contexts/` - React contexts (empty)

### Task 1.3: Review the Types ✅ (Already Done)

Open `src/types/index.ts` to see the predefined types:
- `CounterState` - for counter state management
- `Todo` and `TodoState` - for todo list functionality
- `ButtonProps`, `InputProps`, `ModalProps` - for common components

---

## 🎯 Phase 2: Counter Component

### Task 2.1: Create Counter Reducer

**File to create:** `src/reducers/counterReducer.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState } from '@/types';

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

**Steps:**
1. Create the file `src/reducers/counterReducer.ts`
2. Copy the code above
3. Update `src/store/store.ts` to import and use the counter reducer

### Task 2.2: Update Redux Store

**File to update:** `src/store/store.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer from '@/reducers/counterReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Steps:**
1. Update the store file with the code above
2. Uncomment the counter reducer import
3. Add the counter reducer to the store configuration

### Task 2.3: Create Counter Hook

**File to create:** `src/hooks/useCounter.ts`

```typescript
import { useAppSelector, useAppDispatch } from '@/store/store';
import { increment, decrement, reset, incrementByAmount } from '@/reducers/counterReducer';

export function useCounter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementCounter = () => dispatch(increment());
  const decrementCounter = () => dispatch(decrement());
  const resetCounter = () => dispatch(reset());
  const incrementByAmountCounter = (amount: number) => dispatch(incrementByAmount(amount));

  return {
    count,
    increment: incrementCounter,
    decrement: decrementCounter,
    reset: resetCounter,
    incrementByAmount: incrementByAmountCounter,
  };
}
```

**Steps:**
1. Create the file `src/hooks/useCounter.ts`
2. Copy the code above
3. This hook encapsulates all counter logic and Redux interactions

### Task 2.4: Update Counter Component

**File to update:** `src/components/Counter/Counter.tsx`

```typescript
'use client';

import { useCounter } from '@/hooks/useCounter';
import { useState } from 'react';

export default function Counter() {
  const { count, increment, decrement, reset, incrementByAmount } = useCounter();
  const [inputValue, setInputValue] = useState('5');

  const handleIncrementByAmount = () => {
    const amount = inputValue === '' ? 0 : Number(inputValue);
    incrementByAmount(amount);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Counter Component
        </h2>
        <p className="text-gray-600 mb-3">
          Practice Redux state management with a simple counter.
        </p>
        
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            {count}
          </div>
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={decrement}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Decrement
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={increment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Increment
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
            />
            <button
              onClick={handleIncrementByAmount}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Increment by Amount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Steps:**
1. Replace the content of `src/components/Counter/Counter.tsx` with the code above
2. Test the counter functionality
3. Verify that increment, decrement, reset, and increment by amount work

---

## 📋 Phase 3: Todo List Component

### Task 3.1: Create Todo Reducer

**File to create:** `src/reducers/todoReducer.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '@/types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  searchTerm: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodoItem: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((t) => !t.completed);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoItem,
  clearCompleted,
  setFilter,
  setSearchTerm,
} = todoSlice.actions;

export default todoSlice.reducer;
```

**Steps:**
1. Create the file `src/reducers/todoReducer.ts`
2. Copy the code above
3. Update `src/store/store.ts` to include the todo reducer

### Task 3.2: Update Store with Todo Reducer

**File to update:** `src/store/store.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer from '@/reducers/counterReducer';
import todoReducer from '@/reducers/todoReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Steps:**
1. Update the store file with the code above
2. Add the todo reducer import
3. Add the todo reducer to the store configuration

### Task 3.3: Create Todo Hook

**File to create:** `src/hooks/useTodos.ts`

```typescript
import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoItem,
  clearCompleted,
  setFilter,
  setSearchTerm,
} from '@/reducers/todoReducer';

export function useTodos() {
  const todos = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const searchTerm = useAppSelector((state) => state.todo.searchTerm);
  const dispatch = useAppDispatch();

  const addNewTodo = (text: string) => dispatch(addTodo(text));
  const toggleTodoItem = (id: string) => dispatch(toggleTodo(id));
  const deleteTodoItem = (id: string) => dispatch(deleteTodo(id));
  const updateTodo = (id: string, text: string) => dispatch(updateTodoItem({ id, text }));
  const clearCompletedTodos = () => dispatch(clearCompleted());
  const setFilterOption = (filter: 'all' | 'active' | 'completed') => dispatch(setFilter(filter));
  const setSearch = (term: string) => dispatch(setSearchTerm(term));

  return {
    todos,
    filter,
    searchTerm,
    addTodo: addNewTodo,
    toggleTodo: toggleTodoItem,
    deleteTodo: deleteTodoItem,
    updateTodoItem: updateTodo,
    clearCompleted: clearCompletedTodos,
    setFilter: setFilterOption,
    setSearchTerm: setSearch,
  };
}
```

**Steps:**
1. Create the file `src/hooks/useTodos.ts`
2. Copy the code above
3. This hook encapsulates all todo logic and Redux interactions

### Task 3.4: Create Todo Components

**File to update:** `src/components/TodoList/TodoForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Todo
      </button>
    </form>
  );
}
```

**File to update:** `src/components/TodoList/TodoItem.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodoItem } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateTodoItem(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

**File to update:** `src/components/TodoList/TodoFilter.tsx`

```typescript
'use client';

import { useTodos } from '@/hooks/useTodos';

export default function TodoFilter() {
  const { filter, searchTerm, setFilter, setSearchTerm } = useTodos();

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              filter === filterOption
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**File to update:** `src/components/TodoList/TodoStats.tsx`

```typescript
'use client';

import { useTodos } from '@/hooks/useTodos';

export default function TodoStats() {
  const { todos } = useTodos();
  
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistics</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total:</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Completed:</span>
          <span className="font-medium text-green-600">{completed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Active:</span>
          <span className="font-medium text-blue-600">{active}</span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Task 3.5: Update TodoList Component

**File to update:** `src/components/TodoList/TodoList.tsx`

```typescript
'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';

export default function TodoList() {
  const { todos, filter, searchTerm, clearCompleted } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Todo List Component
      </h2>
      <p className="text-gray-600 mt-1 mb-6">
        Build a complete CRUD application with Redux and custom hooks.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <TodoForm />
          <TodoFilter />
          
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {filteredTodos.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No todos found. Add some todos to get started!
              </p>
            )}
          </div>
          
          {todos.some((todo) => todo.completed) && (
            <button
              onClick={clearCompleted}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Clear Completed ({completedCount})
            </button>
          )}
        </div>
        
        <div>
          <TodoStats />
        </div>
      </div>
    </div>
  );
}
```

**Steps:**
1. Update all the TodoList component files with the code above
2. Test the todo functionality
3. Verify that add, toggle, edit, delete, filter, and search work

---

## 🎨 Phase 4: Common Components

### Task 4.1: Create Button Component

**File to create:** `src/components/common/Button.tsx`

```typescript
import { ButtonProps } from '@/types';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-medium transition-colors duration-200 rounded-md';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ].join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

**Steps:**
1. Create the file `src/components/common/Button.tsx`
2. Copy the code above
3. Update existing components to use this Button component

### Task 4.2: Create Input Component

**File to create:** `src/components/common/Input.tsx`

```typescript
import { InputProps } from '@/types';

export default function Input({
  value,
  onChange,
  placeholder,
  label,
  error,
  className = '',
  variant = 'default',
  onKeyDown,
  multiline = false,
  rows = 1,
}: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const classes = [baseClasses, errorClasses, className].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          onKeyDown={onKeyDown}
          className={classes}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={classes}
        />
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/common/Input.tsx`
2. Copy the code above
3. Update existing components to use this Input component

### Task 4.3: Create Modal Component

**File to create:** `src/components/common/Modal.tsx`

```typescript
import { useEffect } from 'react';
import { ModalProps } from '@/types';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/common/Modal.tsx`
2. Copy the code above
3. Test the modal component with a simple implementation

---

## 🚀 Phase 5: Advanced Features

### Task 5.1: Add Redux Persistence with redux-persist

**File to update:** `src/store/store.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from '@/reducers/counterReducer';
import todoReducer from '@/reducers/todoReducer';

const todoPersistConfig = {
  key: 'todo',
  storage,
  whitelist: ['todos'],
};

const counterPersistConfig = {
  key: 'counter',
  storage,
  whitelist: ['value'],
};

const TodoReducer = persistReducer(todoPersistConfig, todoReducer);
const CounterReducer = persistReducer(counterPersistConfig, counterReducer);

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todo: TodoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**File to update:** `src/components/Providers.tsx`

```typescript
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

**Steps:**
1. Update the store to use persistReducer for both counter and todo
2. Add the persistor and PersistGate to Providers
3. Test that state persists across page reloads

**What this does:**
- **todoPersistConfig**: Persists only the `todos` array from todo state
- **counterPersistConfig**: Persists only the `value` from counter state
- **PersistGate**: Ensures persisted state is loaded before rendering the app
- **Middleware configuration**: Ignores redux-persist actions in serializable checks

### Task 5.2: Add Dark Mode

**File to create:** `src/hooks/useDarkMode.ts`

```typescript
import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return { isDark, toggleDarkMode };
}
```

**File to create:** `src/components/common/DarkModeToggle.tsx`

```typescript
'use client';

import { useDarkMode } from '@/hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        // Sun icon for light mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
```

**File to update:** `src/components/Layout/Layout.tsx`

```typescript
import { ReactNode } from 'react';
import DarkModeToggle from '@/components/common/DarkModeToggle';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frontend Learning Exercise
          </h1>
          <DarkModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, Redux, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
```

**Steps:**
1. Create the dark mode hook and toggle component
2. Update the layout to include dark mode toggle
3. Test dark mode functionality

---

## 🧪 Testing Your Implementation

### Manual Testing Checklist

After completing each phase, test these features:

**Counter Component:**
- [ ] Increment button increases count
- [ ] Decrement button decreases count
- [ ] Reset button sets count to 0
- [ ] Increment by amount works
- [ ] Count displays correctly

**Todo List Component:**
- [ ] Add new todos
- [ ] Toggle todo completion
- [ ] Edit todo text
- [ ] Delete todos
- [ ] Filter todos (all/active/completed)
- [ ] Search todos
- [ ] Clear completed todos
- [ ] Statistics display correctly

**Common Components:**
- [ ] Button variants work correctly
- [ ] Input component handles changes
- [ ] Modal opens and closes properly

**Advanced Features:**
- [ ] Todos persist in localStorage
- [ ] Counter persists in localStorage
- [ ] Dark mode toggle works
- [ ] Dark mode persists across sessions
- [ ] Responsive design works on mobile

### Development Tools

Use these tools to debug and verify your implementation:

1. **Redux DevTools**: Check state changes
2. **React DevTools**: Inspect component hierarchy
3. **Browser DevTools**: Check for console errors
4. **ESLint**: Ensure code quality
5. **TypeScript**: Verify type safety

---

## 🎯 Success Criteria

You'll know you've successfully completed this exercise when:

- ✅ Application runs without errors
- ✅ Counter increments and decrements correctly
- ✅ Todo list CRUD operations work
- ✅ Search and filtering work
- ✅ Components are properly styled with Tailwind
- ✅ Redux state management is implemented correctly
- ✅ Application is responsive
- ✅ Code follows TypeScript best practices
- ✅ No ESLint errors
- ✅ All features work as expected
- ✅ Dark mode works
- ✅ Persistence works

---

## 🚀 Next Steps

After completing this exercise, you can:

1. **Add more features**: Animations, notifications, advanced filtering
2. **Improve UX**: Better error handling, loading states, accessibility
3. **Add testing**: Unit tests, integration tests
4. **Deploy**: Deploy to Vercel, Netlify, or other platforms
5. **Learn more**: Explore advanced Redux patterns, Next.js features
