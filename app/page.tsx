import { supabase } from '@/lib/supabase';
import TodoItem from '@/components/TodoItem';
import { addTodo } from './actions/todo';

export default async function Home() {
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('updated_at', { ascending: true });
  
  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      {/* Add Todo Form */}
      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="New todo..."
          className="flex-1 border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Todo Items */}
      <ul className="space-y-3">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
