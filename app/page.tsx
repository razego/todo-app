import * as React from 'react';
import Container from '@mui/material/Container';
import { supabase } from '@/lib/supabase';
import TodoList from '@/components/TodoList';
import Typography from '@mui/material/Typography';

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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Todo App
      </Typography>

      <TodoList initialTodos={todos || []} />
    </Container>
  );
}