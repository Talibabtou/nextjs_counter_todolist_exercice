'use client';

import { useTodos } from '@/hooks/useTodos';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function TodoFilter() {
  const { filter, searchTerm, setFilter, setSearchTerm } = useTodos();

  return (
    <div className="space-y-2">
      <Input
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search todos..."
        variant="search"
      />
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map((filterOption) => (
          <Button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`btn ${
              filter === filterOption ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
