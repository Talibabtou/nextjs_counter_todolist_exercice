'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { addTodo, toggleTodo, deleteTodo, updateTodoItem, setFilter, setSearchTerm, clearCompleted } from '@/reducers/todoReducer';

export function useTodos() {
  const dispatch = useAppDispatch();
  const { todos, filter, searchTerm } = useAppSelector((state) => state.todo);

  return {
    todos,
    filter,
    searchTerm,
    addTodo: (text: string) => dispatch(addTodo(text)),
    toggleTodo: (id: string) => dispatch(toggleTodo(id)),
    deleteTodo: (id: string) => dispatch(deleteTodo(id)),
    updateTodoItem: (id: string, text: string) => dispatch(updateTodoItem({ id, text })),
    setFilter: (filter: 'all' | 'active' | 'completed') => dispatch(setFilter(filter)),
    setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
    clearCompleted: () => dispatch(clearCompleted()),
  };
}
