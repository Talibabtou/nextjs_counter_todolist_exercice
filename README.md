# 🎯 Frontend Learning Exercise

Welcome to your comprehensive frontend development exercise! This project will help you learn **Next.js**, **Redux Toolkit**, and **Tailwind CSS** by building a practical application.

## 📋 Exercise Overview

You'll build a **Todo List Application** with a **Counter** component, incorporating real-world patterns used in the ADRENA codebase.

### 🎯 Learning Objectives

- ✅ **Next.js**: Project setup, routing, and development workflow
- ✅ **Redux Toolkit**: State management, actions, reducers, and selectors
- ✅ **Tailwind CSS**: Utility-first styling and responsive design
- ✅ **TypeScript**: Type safety and interfaces
- ✅ **Custom Hooks**: Reusable logic patterns
- ✅ **Component Architecture**: Best practices and patterns

## 🚀 Project Structure

```
frontend-learning-exercise/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Shared components (Button, Input, etc.)
│   │   ├── Counter/           # Counter component
│   │   └── TodoList/          # Todo list components
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Redux store configuration
│   ├── reducers/              # Redux reducers
│   └── types/                 # TypeScript type definitions
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🛠️ Setup Instructions

### Step 1: Initialize Next.js Project

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install additional dependencies
npm install @reduxjs/toolkit react-redux
npm install -D @types/node @types/react @types/react-dom
```

### Step 2: Configure Development Environment

```bash
# Install development tools
npm install -D prettier eslint-config-prettier
npm install -D husky lint-staged

# Initialize Husky
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

### Step 3: Create Configuration Files

You'll need to create/modify these files:

1. **`tailwind.config.js`** - Tailwind configuration
2. **`tsconfig.json`** - TypeScript configuration  
3. **`.prettierrc`** - Prettier configuration
4. **`.eslintrc.json`** - ESLint configuration

## 📝 Exercise Tasks

### 🎯 Phase 1: Project Setup & Basic Structure

#### Task 1.1: Initialize Project
- [ ] Create Next.js project with TypeScript and Tailwind
- [ ] Install Redux Toolkit and React Redux
- [ ] Set up development tools (ESLint, Prettier, Husky)
- [ ] Configure import aliases (`@/*`)

#### Task 1.2: Create Basic File Structure
- [ ] Create `src/components/common/` directory
- [ ] Create `src/store/` directory
- [ ] Create `src/reducers/` directory
- [ ] Create `src/actions/` directory
- [ ] Create `src/selectors/` directory
- [ ] Create `src/hooks/` directory
- [ ] Create `src/types/` directory

#### Task 1.3: Set Up Redux Store
- [ ] Create `src/store/store.ts` with Redux Toolkit configuration
- [ ] Set up TypeScript types for RootState and AppDispatch
- [ ] Create typed hooks for useDispatch and useSelector

### 🎯 Phase 2: Counter Component

#### Task 2.1: Create Counter Reducer
- [ ] Create `src/reducers/counterReducer.ts`
- [ ] Implement increment, decrement, and reset actions
- [ ] Add state for count value
- [ ] Export reducer and action creators

#### Task 2.2: Create Counter Component
- [ ] Create `src/components/Counter/Counter.tsx`
- [ ] Implement increment, decrement, and reset buttons
- [ ] Display current count value
- [ ] Style with Tailwind CSS

#### Task 2.3: Create Custom Hook
- [ ] Create `src/hooks/useCounter.ts`
- [ ] Implement counter logic with Redux
- [ ] Return count value and action functions
- [ ] Use in Counter component

### 🎯 Phase 3: Todo List Component

#### Task 3.1: Define Todo Types
- [ ] Create `src/types/todo.ts`
- [ ] Define Todo interface with id, text, completed, createdAt
- [ ] Define TodoState interface
- [ ] Define action types

#### Task 3.2: Create Todo Reducer
- [ ] Create `src/reducers/todoReducer.ts`
- [ ] Implement add, toggle, delete, and clear actions
- [ ] Add state for todos array
- [ ] Handle todo CRUD operations

#### Task 3.3: Create Todo Components
- [ ] Create `src/components/TodoList/TodoList.tsx` (main container)
- [ ] Create `src/components/TodoList/TodoItem.tsx` (individual todo)
- [ ] Create `src/components/TodoList/TodoForm.tsx` (add new todo)
- [ ] Style all components with Tailwind CSS

#### Task 3.4: Create Todo Hooks
- [ ] Create `src/hooks/useTodos.ts`
- [ ] Implement todo CRUD operations
- [ ] Return todos array and action functions
- [ ] Use in TodoList component

### 🎯 Phase 4: Common Components

#### Task 4.1: Create Button Component
- [ ] Create `src/components/common/Button/Button.tsx`
- [ ] Implement variants: primary, secondary, danger
- [ ] Add size variants: sm, md, lg
- [ ] Add disabled state
- [ ] Style with Tailwind CSS

#### Task 4.2: Create Input Component
- [ ] Create `src/components/common/Input/Input.tsx`
- [ ] Implement controlled input with value and onChange
- [ ] Add placeholder and label support
- [ ] Add error state styling
- [ ] Style with Tailwind CSS

#### Task 4.3: Create Modal Component
- [ ] Create `src/components/common/Modal/Modal.tsx`
- [ ] Implement backdrop and content area
- [ ] Add open/close functionality
- [ ] Add close on backdrop click
- [ ] Style with Tailwind CSS

### 🎯 Phase 5: Advanced Features

#### Task 5.1: Add Persistence
- [ ] Create `src/hooks/useLocalStorage.ts`
- [ ] Implement localStorage for todos
- [ ] Add persistence to Redux store
- [ ] Handle loading and saving state

#### Task 5.2: Add Filtering
- [ ] Create `src/components/TodoList/TodoFilter.tsx`
- [ ] Implement all, active, completed filters
- [ ] Add filter state to Redux
- [ ] Update todo display logic

#### Task 5.3: Add Search
- [ ] Create `src/components/TodoList/TodoSearch.tsx`
- [ ] Implement search functionality
- [ ] Add search state to Redux
- [ ] Filter todos by search term

#### Task 5.4: Add Statistics
- [ ] Create `src/components/TodoList/TodoStats.tsx`
- [ ] Display total, completed, and active counts
- [ ] Add progress bar for completion
- [ ] Style with Tailwind CSS

### 🎯 Phase 6: Layout & Styling

#### Task 6.1: Create Layout Component
- [ ] Create `src/components/Layout/Layout.tsx`
- [ ] Implement header with title
- [ ] Add main content area
- [ ] Add footer with version info
- [ ] Style with Tailwind CSS

#### Task 6.2: Responsive Design
- [ ] Make components mobile-first
- [ ] Add responsive breakpoints
- [ ] Test on different screen sizes
- [ ] Optimize for mobile experience

#### Task 6.3: Dark Mode
- [ ] Add dark mode toggle
- [ ] Implement theme switching
- [ ] Add dark mode styles
- [ ] Persist theme preference

### 🎯 Phase 7: Testing & Optimization

#### Task 7.1: Add Error Boundaries
- [ ] Create `src/components/common/ErrorBoundary.tsx`
- [ ] Handle component errors gracefully
- [ ] Display user-friendly error messages
- [ ] Add error reporting

#### Task 7.2: Performance Optimization
- [ ] Add React.memo to components
- [ ] Optimize Redux selectors
- [ ] Add loading states
- [ ] Implement lazy loading

#### Task 7.3: Accessibility
- [ ] Add ARIA labels
- [ ] Implement keyboard navigation
- [ ] Add focus management
- [ ] Test with screen readers

## 🎨 Design Requirements

### Color Palette
```css
/* Primary Colors */
--primary: #3b82f6;    /* Blue */
--secondary: #64748b;   /* Slate */
--success: #10b981;     /* Green */
--danger: #ef4444;      /* Red */
--warning: #f59e0b;     /* Amber */

/* Neutral Colors */
--background: #ffffff;  /* White */
--surface: #f8fafc;     /* Gray-50 */
--text: #1e293b;        /* Gray-800 */
--text-secondary: #64748b; /* Gray-500 */
```

### Component Styling
- Use Tailwind utility classes
- Implement responsive design
- Add hover and focus states
- Include smooth transitions
- Follow mobile-first approach

## 🧪 Testing Your Implementation

### Manual Testing Checklist
- [ ] Counter increments and decrements correctly
- [ ] Todo items can be added, toggled, and deleted
- [ ] Search functionality works
- [ ] Filtering works correctly
- [ ] Responsive design works on mobile
- [ ] Dark mode toggle works
- [ ] Local storage persistence works
- [ ] Error boundaries catch errors

### Development Tools
- [ ] Redux DevTools show state changes
- [ ] React DevTools show component hierarchy
- [ ] ESLint shows no errors
- [ ] TypeScript shows no type errors
- [ ] Prettier formats code correctly

## 📚 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

### Redux Toolkit
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Getting Started

1. **Clone this repository**
2. **Follow the setup instructions above**
3. **Complete tasks in order**
4. **Test your implementation**
5. **Compare with ADRENA patterns**

## 💡 Tips for Success

- **Start Small**: Begin with basic functionality and add features incrementally
- **Use TypeScript**: Define proper types for all data structures
- **Follow Patterns**: Study ADRENA's patterns and apply similar approaches
- **Test Frequently**: Test each feature as you build it
- **Use DevTools**: Use Redux DevTools and React DevTools for debugging
- **Read Documentation**: Refer to official docs when stuck

## 🎯 Success Criteria

You'll know you've successfully completed this exercise when:

- ✅ Application runs without errors
- ✅ All features work as expected
- ✅ Code follows TypeScript best practices
- ✅ Components are properly styled with Tailwind
- ✅ Redux state management is implemented correctly
- ✅ Application is responsive and accessible
- ✅ Code is well-organized and maintainable

---

**Happy Coding! 🚀**

This exercise will give you hands-on experience with the same technologies and patterns used in the ADRENA frontend. Take your time, experiment, and don't hesitate to refer back to the ADRENA codebase for inspiration! 