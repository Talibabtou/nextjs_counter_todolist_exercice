# 🎯 Exercise Step-by-Step Guide

This guide will walk you through completing the frontend learning exercise. Follow each step carefully and test your implementation before moving to the next step.

## 🚀 Getting Started

### Step 1: Initialize the Project

1. **Navigate to the exercise directory:**
   ```bash
   cd frontend-learning-exercise
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

You should see a page with two placeholder sections for Counter and Todo List components.

---

## 📝 Phase 1: Project Setup & Basic Structure

### Task 1.1: Initialize Project ✅ (Already Done)

The project is already set up with:
- ✅ Next.js with TypeScript
- ✅ Tailwind CSS
- ✅ Redux Toolkit
- ✅ ESLint and Prettier
- ✅ Basic file structure

### Task 1.2: Create Basic File Structure ✅ (Already Done)

The following directories are already created:
- ✅ `src/components/app/`
- ✅ `src/components/common/`
- ✅ `src/store/`
- ✅ `src/reducers/`
- ✅ `src/actions/`
- ✅ `src/selectors/`
- ✅ `src/hooks/`
- ✅ `src/types/`

### Task 1.3: Set Up Redux Store ✅ (Already Done)

The Redux store is configured in `src/store/store.ts` with:
- ✅ Redux Toolkit configuration
- ✅ TypeScript types for RootState and AppDispatch
- ✅ Typed hooks for useDispatch and useSelector

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

### Task 2.2: Create Counter Component

**File to create:** `src/components/Counter/Counter.tsx`

```typescript
'use client';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { increment, decrement, reset } from '@/reducers/counterReducer';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="text-center">
      <div className="text-6xl font-bold text-primary-600 mb-4">{count}</div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => dispatch(decrement())}
          className="btn btn-secondary"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="btn btn-danger"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="btn btn-primary"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/Counter/Counter.tsx`
2. Copy the code above
3. Import and use the Counter component in `src/app/page.tsx`

### Task 2.3: Create Custom Hook

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
3. Update and simplify the Counter component to use this hook

---

## 📋 Phase 3: Todo List Component

### Task 3.1: Define Todo Types ✅ (Already Done)

The types are already defined in `src/types/index.ts`.

### Task 3.2: Create Todo Reducer

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
        createdAt: new Date(),
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
  clearCompleted,
  setFilter,
  setSearchTerm,
} = todoSlice.actions;

export default todoSlice.reducer;
```

**Steps:**
1. Create the file `src/reducers/todoReducer.ts`
2. Copy the code above
3. Update `src/store/store.ts` to import and use the todo reducer

### Task 3.3: Create Todo Components

**File to create:** `src/components/TodoList/TodoList.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addTodo, clearCompleted } from '@/reducers/todoReducer';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';

export default function TodoList() {
  const todos = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.filter);
  const searchTerm = useAppSelector((state) => state.todo.searchTerm);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    return matchesSearch && matchesFilter;
  });

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="space-y-4">
      <TodoForm />
      <TodoFilter />
      
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      
      {todos.some((todo) => todo.completed) && (
        <button
          onClick={handleClearCompleted}
          className="btn btn-danger"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}
```

**File to create:** `src/components/TodoList/TodoItem.tsx`

```typescript
'use client';

import { useAppDispatch } from '@/store/store';
import { toggleTodo, deleteTodo } from '@/reducers/todoReducer';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
      />
      <span
        className={`flex-1 ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        className="text-danger-500 hover:text-danger-700"
      >
        Delete
      </button>
    </div>
  );
}
```

**File to create:** `src/components/TodoList/TodoForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { addTodo } from '@/reducers/todoReducer';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
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
        className="input"
      />
      <button type="submit" className="btn btn-primary w-full">
        Add Todo
      </button>
    </form>
  );
}
```

**File to create:** `src/components/TodoList/TodoFilter.tsx`

```typescript
'use client';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { setFilter, setSearchTerm } from '@/reducers/todoReducer';

export default function TodoFilter() {
  const filter = useAppSelector((state) => state.todo.filter);
  const searchTerm = useAppSelector((state) => state.todo.searchTerm);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        placeholder="Search todos..."
        className="input"
      />
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => dispatch(setFilter(filterOption))}
            className={`btn ${
              filter === filterOption ? 'btn-primary' : 'btn-secondary'
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

**Steps:**
1. Create all four files in `src/components/TodoList/`
2. Copy the code for each file
3. Import and use the TodoList component in `src/app/page.tsx`

### Task 3.4: Create Todo Hooks

**File to create:** `src/hooks/useTodos.ts`

```typescript
import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
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
    clearCompleted: clearCompletedTodos,
    setFilter: setFilterOption,
    setSearchTerm: setSearch,
  };
}
```

**Steps:**
1. Create the file `src/hooks/useTodos.ts`
2. Copy the code above
3. Update the TodoList components to use this hook

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
  const baseClasses = 'btn font-medium transition-colors duration-200';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
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

**File to create:** `src/components/common/Input/Input.tsx`

```typescript
import { InputProps } from '@/types';

export default function Input({
  value,
  onChange,
  placeholder,
  label,
  error,
  className = '',
}: InputProps) {
  const baseClasses = 'input';
  const errorClasses = error ? 'border-danger-500 focus:ring-danger-500' : '';
  const classes = [baseClasses, errorClasses, className].join(' ');

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={classes}
      />
      {error && (
        <p className="text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/common/Input/Input.tsx`
2. Copy the code above
3. Update existing components to use this Input component

### Task 4.3: Create Modal Component

**File to create:** `src/components/common/Modal/Modal.tsx`

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
1. Create the file `src/components/common/Modal/Modal.tsx`
2. Copy the code above
3. Test the modal component with a simple implementation

---

## 🚀 Phase 5: Advanced Features

### Task 5.1: Add Persistence

**File to create:** `src/hooks/useLocalStorage.ts`

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

**Steps:**
1. Create the file `src/hooks/useLocalStorage.ts`
2. Copy the code above
3. Update the Redux store to use localStorage for persistence

### Task 5.2: Add Statistics

**File to create:** `src/components/TodoList/TodoStats.tsx`

```typescript
'use client';

import { useAppSelector } from '@/store/store';

export default function TodoStats() {
  const todos = useAppSelector((state) => state.todo.todos);
  
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Statistics</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total:</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span>Completed:</span>
          <span className="font-medium text-success-600">{completed}</span>
        </div>
        <div className="flex justify-between">
          <span>Active:</span>
          <span className="font-medium text-primary-600">{active}</span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/TodoList/TodoStats.tsx`
2. Copy the code above
3. Add the TodoStats component to the main page

---

## 🎨 Phase 6: Layout & Styling

### Task 6.1: Create Layout Component

**File to create:** `src/components/Layout/Layout.tsx`

```typescript
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Frontend Learning Exercise
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          <p>Built with Next.js, Redux, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
```

**Steps:**
1. Create the file `src/components/Layout/Layout.tsx`
2. Copy the code above
3. Update the main page to use this Layout component

### Task 6.2: Dark Mode

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

**Steps:**
1. Create the file `src/hooks/useDarkMode.ts`
2. Copy the code above
3. Add a dark mode toggle to the layout
4. Update Tailwind classes to support dark mode

---

## 🧪 Testing Your Implementation

### Manual Testing Checklist

After completing each phase, test these features:

**Counter Component:**
- [ ] Increment button increases count
- [ ] Decrement button decreases count
- [ ] Reset button sets count to 0
- [ ] Count displays correctly

**Todo List Component:**
- [ ] Add new todos
- [ ] Toggle todo completion
- [ ] Delete todos
- [ ] Filter todos (all/active/completed)
- [ ] Search todos
- [ ] Clear completed todos

**Common Components:**
- [ ] Button variants work correctly
- [ ] Input component handles changes
- [ ] Modal opens and closes properly

**Advanced Features:**
- [ ] Todos persist in localStorage
- [ ] Statistics display correctly
- [ ] Dark mode toggle works
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

---

## 💡 Tips for Success

1. **Start Small**: Begin with basic functionality and add features incrementally
2. **Test Frequently**: Test each feature as you build it
3. **Use DevTools**: Use Redux DevTools and React DevTools for debugging
4. **Read Documentation**: Refer to official docs when stuck
5. **Follow Patterns**: Study the ADRENA codebase for inspiration
6. **Type Everything**: Define proper TypeScript types for all data structures

---

**Happy Coding! 🚀**

This exercise will give you hands-on experience with the same technologies and patterns used in the ADRENA frontend. Take your time, experiment, and don't hesitate to refer back to the ADRENA codebase for inspiration! 