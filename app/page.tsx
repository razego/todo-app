'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import DeleteTodoModal from '@/components/DeleteTodoModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

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
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Todo App
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>  

        <Button variant="primary" size="large">Click me</Button>
        <Button variant="secondary" size="large" >Click me</Button>
        <Button variant="outline" size="large">Click me</Button>
        <Button variant="ghost" size="large">Click me</Button>
        <Button variant="danger" size="large">Click me</Button>

        </Box>
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Input 
          label="Email"
          type="email"
          required
          fullWidth
          placeholder="your@email.com"
        />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </Button>
        </Box>

        <Modal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="medium"
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Sample Modal
          </Typography>
          <Typography sx={{ mb: 3 }}>
            This is a simple modal component! You can put any content here.
          </Typography>
          <Input 
            label="Email"
            type="email"
            required
            fullWidth
            placeholder="your@email.com"
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(false)}
            >
              Confirm
            </Button>
          </Box>
        </Modal>

        <Checkbox 
          label="Required field"
          required
          disabled={false}
          defaultChecked={true}
        />
      </Box>

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
    </Container>
  );
}