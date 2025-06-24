import * as React from 'react';
import Container from '@mui/material/Container';
import TodoList from '@/components/TodoList';

export default function Home() {


  return (
    <Container >
        <TodoList />
    </Container>
  );
}