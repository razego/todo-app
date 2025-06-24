'use client';
import * as React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { Todo } from '@/types';
import AddTodoForm from '@/components/AddTodoForm';
import DeleteTodoModal from '@/components/DeleteTodoModal';
import EditTodoModal from '@/components/EditTodoModal';
import TodoItem from '@/components/TodoItem';
import Button from '@/components/ui/Button';

export interface TodoListProps {
  initialTodos?: Todo[];
}

export const TodoList = ({ initialTodos = [] }: TodoListProps) => {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDeletingCompleted, setIsDeletingCompleted] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  // Add new todo
  const handleAddTodo = async (title: string) => {
    try {
      setIsAdding(true);
      const { data, error } = await supabase
        .from('todos')
        .insert([{ title }])
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Delete todo
  const handleDeleteTodo = async () => {
    if (!selectedTodo) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', selectedTodo.id);

      if (error) throw error;
      setTodos(prev => prev.filter(todo => todo.id !== selectedTodo.id));
      setDeleteModalOpen(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Edit todo
  const handleEditTodo = async (updateData: any) => {
    try {
      setIsEditing(true);

      const { data, error } = await supabase
        .from('todos')
        .update({...updateData})
        .eq('id', updateData.id)
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => prev.map(todo => todo.id === data.id ? data : todo));
      setEditModalOpen(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsEditing(false);
    }
  };

  // Toggle todo completion
  const handleToggleComplete = async (todo: Todo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ 
          completed: !todo.completed,
        })
        .eq('id', todo.id)
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => prev.map(t => t.id === data.id ? data : t));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete all completed todos
  const handleDeleteCompleted = async () => {
    try {
      setIsDeletingCompleted(true);
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('completed', true);

      if (error) throw error;
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Error deleting completed todos:', error);
    } finally {
      setIsDeletingCompleted(false);
    }
  };



  const completedTodos = todos.filter(todo => todo.completed);
  const showDeleteCompletedButton = completedTodos.length > 0;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Todo App
      </Typography>

      {/* Add Todo Form */}
      <Box sx={{ mb: 4 }}>
        <AddTodoForm
          onAdd={handleAddTodo}
          loading={isAdding}
          placeholder="What needs to be done?"
        />
      </Box>

      {/* Delete Completed Button - Always reserve space */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'flex-end',
        minHeight: '36px', // Reserve space for small button
        alignItems: 'center',
      }}>
        <Button
          variant="outline"
          size="small"
          onClick={handleDeleteCompleted}
          loading={isDeletingCompleted}
          disabled={isDeletingCompleted || !showDeleteCompletedButton}
          sx={{
            color: 'error.main',
            borderColor: 'error.main',
            opacity: showDeleteCompletedButton ? 1 : 0,
            visibility: showDeleteCompletedButton ? 'visible' : 'hidden',
            transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: showDeleteCompletedButton ? 'error.main' : 'transparent',
              color: showDeleteCompletedButton ? 'white' : 'error.main',
            },
          }}
        >
          Delete {completedTodos.length} Completed
        </Button>
      </Box>

      {/* Todo List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {todos.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No todos yet. Add one above to get started!
            </Typography>
          </Paper>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onEdit={(todo: Todo) => {
                setSelectedTodo(todo);
                setEditModalOpen(true);
              }}
              onDelete={(todo: Todo) => {
                setSelectedTodo(todo);
                setDeleteModalOpen(true);
              }}
            />
          ))
        )}
      </Box>

      {/* Delete Modal */}
      <DeleteTodoModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedTodo(null);
        }}
        onConfirm={handleDeleteTodo}
        todoTitle={selectedTodo?.title}
        loading={isDeleting}
      />

      {/* Edit Modal */}
      <EditTodoModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedTodo(null);
        }}
        onSave={handleEditTodo}
        todo={selectedTodo ? {
          ...selectedTodo,
          title: selectedTodo.title,
          description: selectedTodo.description || '',
        } : null}
        loading={isEditing}
      />
    </Box>
  );
};

export default TodoList; 