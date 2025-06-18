import TodoItem from '@/components/TodoItem';
import { addTodo, deleteTodos, getTodos } from './actions/todo';

type PageSearchParams = { q?: string };

export default async function Home({
  searchParams,
}: {
  /** When the component is async, Next passes a Promise */
  searchParams?: Promise<PageSearchParams>;
}) {
  const { q = '' } = (await searchParams) ?? {};
  const todos = await getTodos(q);
  
  return (
    <div className="container mx-auto max-w-md py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>

      {/* Search Form (GET) */}
      <form method="GET" className="flex gap-2 mb-4">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search todos..."
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {/* Add Todo Form */}
      <form action={addTodo} className="flex gap-2 mb-8">
        <input
          type="text"
          name="title"
          placeholder="New todo..."
          className="input input-bordered flex-1"
          required
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add
        </button>
      </form>

      {/* Bulk Delete Form */}
      <form id="delete-form" action={deleteTodos} className="mb-8">
        <div className="flex justify-end mb-4">
          <button
            type="submit"
            className="btn btn-error bulk-delete-btn invisible"
          >
            Delete Selected
          </button>
        </div>
      </form>

      {/* Todo Items List */}
      <ul className="list bg-base-100 rounded-box shadow-md">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
