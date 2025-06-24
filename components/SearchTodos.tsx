import * as React from 'react';
import Input from '@/components/ui/Input';

export interface SearchTodosProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchTodos = ({ value, onChange, placeholder = "Search by title or description..." }: SearchTodosProps) => {
  return (
    <Input
      label="Search todos"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ flex: 1 }}
      size="small"
    />
  );
};

export default SearchTodos; 