import * as React from 'react';
import Container from '@mui/material/Container';
import { supabase } from '@/lib/supabase';
import TodoList from '@/components/TodoList';

export default async function Home() {
  // Fetch todos on the server
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
  }

  return (
    <Container>
      <TodoList initialTodos={todos || []} />
    </Container>
  );
}