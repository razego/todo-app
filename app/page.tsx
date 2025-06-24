'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@/components/ui/Button';
import DeleteTodoModal from '@/components/DeleteTodoModal';
import EditTodoModal from '@/components/EditTodoModal';
import AddTodoForm from '@/components/AddTodoForm';

export default function Home() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       <Box sx={{ mt: 4 }}>
        <Button 
          variant="primary" 
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Open Delete Modal
        </Button>
      </Box>
      <DeleteTodoModal
        open={isDeleteModalOpen}
        onClose={() => {setIsDeleteModalOpen(false)}}
        onConfirm={() => {setIsDeleteModalOpen(false)}}
        todoTitle="Todo 1"
      />


      <Box sx={{ mt: 4}}>
        <Button 
          variant="primary" 
          onClick={() => setIsEditModalOpen(true)}
        >
          Open Edit Modal
        </Button>
      </Box>
      <EditTodoModal
        open={isEditModalOpen}
        onClose={() => {setIsEditModalOpen(false)}}
        onSave={() => {setIsEditModalOpen(false)}}
        todo={null}
      />
      </Box>

      <Box sx={{ mt: 4 }}>
        <AddTodoForm
          onAdd={() => {}}
        />
      </Box>


    </Container>
  );
}