'use client';
import * as React from 'react';
import { Typography, Box, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Todo } from '@/types';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';

export interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const StyledTodoCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed?: boolean }>(({ theme, completed }) => ({
  padding: '16px 20px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `2px solid ${theme.palette.divider}`,
  background: completed 
    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`
    : theme.palette.background.paper,
  opacity: completed ? 0.8 : 1,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  minHeight: '60px',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
    borderColor: theme.palette.primary.main,
  },
  
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: completed 
      ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
      : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: completed ? 0.6 : 1,
  },
}));

const ContentBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
}));

const TextContainer = styled(Box)({
  flex: 1,
  minWidth: 0, // Allows text to truncate properly
});

const ActionContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
  flexShrink: 0,
  marginLeft: '12px',
}));

const DateChip = styled(Chip)(() => ({
  fontSize: '0.75rem',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  return (
    <StyledTodoCard completed={todo.completed} data-testid="todo-item">
      <ContentBox>
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggleComplete(todo)}
          size="small"
        />
        
        <TextContainer>
          <Typography
            variant="subtitle1"
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
              fontWeight: 500,
              wordBreak: 'break-word',
              lineHeight: 1.3,
            }}
          >
            {todo.title}
          </Typography>
          
          {todo.description && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: todo.completed ? 'line-through' : 'none',
                lineHeight: 1.4,
                wordBreak: 'break-word',
                marginTop: '2px',
              }}
            >
              {todo.description}
            </Typography>
          )}
        </TextContainer>
        
        <DateChip
          label={formatDate(todo.created_at)}
          size="small"
          variant="outlined"
          color="default"
          sx={{ fontSize: '0.7rem' }}
        />
      </ContentBox>

      <ActionContainer>
        <Button
          variant="ghost"
          size="small"
          onClick={() => onEdit(todo)}
          sx={{ 
            minWidth: '50px',
            color: 'text.secondary',
            fontSize: '0.8rem',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="small"
          onClick={() => onDelete(todo)}
          sx={{ 
            minWidth: '55px',
            color: 'text.secondary',
            fontSize: '0.8rem',
            '&:hover': {
              color: 'error.main',
            },
          }}
        >
          Delete
        </Button>
      </ActionContainer>
    </StyledTodoCard>
  );
};

export default TodoItem; 