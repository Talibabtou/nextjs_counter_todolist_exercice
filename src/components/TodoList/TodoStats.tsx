'use client';

import { useAppSelector } from '@/store/store';

export default function TodoStats() {
  const todos = useAppSelector((state) => state.todo.todos);
  
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-1 text-sm text-right">
      {/* Total */}
      <div className="flex gap-1 justify-end">
        <span className="text-tertiary">Total:</span>
        <span className="font-medium text-primary">{total}</span>
      </div>
      
      {/* Completed */}
      <div className="flex gap-1 justify-end">
        <span className="text-tertiary">Done:</span>
        <span className="font-medium text-success">{completed}</span>
      </div>
      
      {/* Active */}
      <div className="flex gap-1 justify-end">
        <span className="text-tertiary">Active:</span>
        <span className="font-medium text-primary">{active}</span>
      </div>
      
      {/* Progress Bar */}
      <div className="flex gap-2 justify-end items-center">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-tertiary font-medium">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
