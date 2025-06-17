import { deleteTodo, toggleTodo } from '@/app/actions/todo';

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
    <li className="flex items-center gap-2">
      {/* Toggle Completed */}
      <form action={toggleTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="completed" value={String(todo.completed)} />
        <button
          type="submit"
          className="w-6 h-6 rounded border flex items-center justify-center"
        >
          {todo.completed ? '✅' : ''}
        </button>
      </form>

      {/* Title */}
      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
        {todo.title}
      </span>

      {/* Delete */}
      <form action={deleteTodo} className="ml-auto">
        <input type="hidden" name="id" value={todo.id} />
        <button type="submit" className="text-red-500 hover:underline">
          Delete
        </button>
      </form>
    </li>
  );
} 