'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useNotifications } from '@/contexts/NotificationContext';
import Input from '@/components/common/Input';

export default function TodoForm() {
  const { addTodo } = useTodos();
  const { addNotification } = useNotifications();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      addNotification({
        type: 'success',
        title: 'Todo Added',
        message: `"${text.trim()}" has been added to your list`,
      });
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        value={text}
        onChange={setText}
        placeholder="Add a new todo..."
        multiline={true}
        rows={1}
        onKeyDown={handleKeyPress}
      />
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={!text.trim()}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
