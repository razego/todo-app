'use client';

import { useRef, useTransition } from 'react';
import { updateTodo } from '@/app/actions/todo';

interface EditTodoDialogProps {
  todo: {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
  };
}

export default function EditTodoDialog({ todo }: EditTodoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTodo(formData);
      closeModal();
    });
  }

  return (
    <>
      {/* Button to open the modal */}
      <button type="button" onClick={openModal} className="btn btn-square btn-ghost">
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      </button>

      {/* DaisyUI modal using <dialog> element */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Todo</h3>

          {/* Edit form */}
          <form action={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={todo.id} />

            <label className="form-control w-full">
              <span className="label-text">Title</span>
              <input
                type="text"
                name="title"
                defaultValue={todo.title}
                className="input input-bordered w-full"
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Description</span>
              <textarea
                name="description"
                defaultValue={todo.description ?? ''}
                className="textarea textarea-bordered w-full"
              />
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                className="checkbox"
                defaultChecked={todo.completed}
              />
              <span>Completed</span>
            </label>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                {isPending ? 'Saving…' : 'Save'}
              </button>
              {/* Close the modal without saving */}
              <button type="button" className="btn" onClick={closeModal} disabled={isPending}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
} 