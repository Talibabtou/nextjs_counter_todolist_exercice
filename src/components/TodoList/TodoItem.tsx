'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useNotifications } from '@/contexts/NotificationContext';
import { Todo } from '@/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodoItem } = useTodos();
  const { addNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    toggleTodo(todo.id);
    addNotification({
      type: 'success',
      title: todo.completed ? 'Todo Uncompleted' : 'Todo Completed',
      message: todo.completed 
        ? `"${todo.text}" marked as incomplete`
        : `"${todo.text}" marked as complete`,
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    addNotification({
      type: 'success',
      title: 'Todo Deleted',
      message: `"${todo.text}" has been deleted`,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateTodoItem(todo.id, editText.trim());
      setIsEditing(false);
      addNotification({
        type: 'success',
        title: 'Todo Updated',
        message: `"${editText.trim()}" has been updated`,
      });
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
    <div className="card p-3">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editText}
            onChange={setEditText}
            multiline={true}
            rows={1}
            onKeyDown={handleKeyPress}
            placeholder="Edit todo..."
          />
          <div className="flex gap-2 justify-end">
            <Button onClick={handleSave} variant="primary" size="sm">
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="w-4 h-4 text-primary rounded focus:ring-primary"
          />
          
          <div className="min-w-0">
            <span
              className={`block whitespace-pre-wrap break-words ${
                todo.completed ? 'line-through text-tertiary' : 'text-primary'
              }`}
            >
              {todo.text}
            </span>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button onClick={handleEdit} variant="secondary">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
