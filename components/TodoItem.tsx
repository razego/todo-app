import EditTodoDialog from './EditTodoDialog';
import { deleteTodos } from '@/app/actions/todo';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="list-row flex items-center px-6 py-4 gap-4 hover:bg-base-200 transition-all">

      {/* Selection Checkbox for bulk deletion */}
      <input
        type="checkbox"
        name="ids"
        value={todo.id}
        form="delete-form"
        className="checkbox"
      />

      {/* Title and optional description */}
      <div className="flex-1 min-w-0">
        <div className={`text-lg font-medium ${todo.completed ? 'line-through text-base-content/60' : ''}`}>
          {todo.title}
        </div>
        {todo.description && (
          <div className="text-xs uppercase font-semibold opacity-60">
            {todo.description}
          </div>
        )}
      </div>

      {/* Created At */}
        

      {/* Edit Dialog */}
      <EditTodoDialog todo={todo} />

      {/* Delete Button (single) */}
      <form action={deleteTodos}>
        <input type="hidden" name="ids" value={todo.id} />
        <button
          type="submit"
          className="btn btn-square btn-ghost"
        >
          <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </form>
    </li>
  );
} 