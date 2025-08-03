import { InputProps } from '@/types';
import { useEffect, useRef } from 'react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getBaseClasses = () => {
    switch (variant) {
      case 'search':
        return 'search-input';
      case 'number':
        return 'number-input';
      default:
        return 'input';
    }
  };

  const baseClasses = getBaseClasses();
  const errorClasses = error ? 'border-danger focus:ring-danger' : '';
  const classes = [baseClasses, errorClasses, className].join(' ');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
    
    // Auto-resize for textarea
    if (multiline && e.target instanceof HTMLTextAreaElement) {
      const target = e.target;
      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 'px';
    }
  };

  // Reset textarea height when value becomes empty
  useEffect(() => {
    if (multiline && textareaRef.current && value === '') {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${rows * 2.5}rem`;
    }
  }, [value, multiline, rows]);

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-primary">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          className={classes}
          onKeyDown={onKeyDown}
          rows={rows}
          style={{ minHeight: `${rows * 1.5}rem` }}
        />
      ) : (
        <input
          type={variant === 'number' ? 'number' : 'text'}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          className={classes}
          onKeyDown={onKeyDown}
        />
      )}
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  );
}
