'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useNotifications } from '@/contexts/NotificationContext';
import TodoItem from '@/components/TodoList/TodoItem';
import TodoForm from '@/components/TodoList/TodoForm';
import TodoFilter from '@/components/TodoList/TodoFilter';
import TodoStats from '@/components/TodoList/TodoStats';
import Button from '@/components/common/Button';
import ClearCompletedModal from '@/components/common/Modal/ClearCompletedModal';

export default function TodoList() {
  const { todos, filter, searchTerm, clearCompleted } = useTodos();
  const { addNotification } = useNotifications();
  const [showClearModal, setShowClearModal] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    return matchesSearch && matchesFilter;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearCompletedClick = () => {
    setShowClearModal(true);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    addNotification({
      type: 'success',
      title: 'Todos Cleared',
      message: `Successfully cleared ${completedCount} completed todo${completedCount !== 1 ? 's' : ''}`,
    });
    setShowClearModal(false);
  };

  return (
    <>
      <div className="card p-4 overflow-visible">
        <div className="overflow-visible">
          {/* Header with Title, Subtitle, and Stats */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-primary">
                Todo List Component
              </h2>
              <p className="text-secondary mt-1">
                Build a complete CRUD application with Redux and custom hooks.
              </p>
            </div>
            
            {/* Compact Stats on the right */}
            <div className="ml-4">
              <TodoStats />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <TodoForm />
            
            {/* Filter and Clear Completed on the same line */}
            <div className="flex items-center justify-between">
              <TodoFilter />
              
              {todos.some((todo) => todo.completed) && (
                <Button
                  onClick={handleClearCompletedClick}
                  variant="danger"
                >
                  Clear All Completed ({completedCount})
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal rendered outside the card */}
      <ClearCompletedModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        completedCount={completedCount}
        onConfirm={handleClearCompleted}
      />
    </>
  );
}
