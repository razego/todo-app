'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  try {
    const title = String(formData.get('title'))?.trim();
    if (!title) return;
    
    const { error } = await supabase.from('todos').insert({ title, completed: false });
    
    if (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
    
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw error;
  }
}

export async function deleteTodos(formData: FormData) {
  try {
    // Retrieve all selected ids from the submitted form
    const ids = formData.getAll('ids').map((id) => String(id));

    if (ids.length === 0) return;

    const { error } = await supabase
      .from('todos')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error deleting selected todos:', error);
      throw error;
    }

    // Revalidate the homepage so the list refreshes
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to bulk delete todos:', error);
    throw error;
  }
}

export async function updateTodo(formData: FormData) {
  try {
    // Extract fields from the form data
    const id = String(formData.get('id'));
    if (!id) return;

    const title = String(formData.get('title') ?? '').trim();
    const descriptionRaw = formData.get('description');
    const description = descriptionRaw !== null ? String(descriptionRaw).trim() : null;

    // Checkbox returns 'on' when checked, otherwise null
    const completed = formData.get('completed') !== null;

    const { error } = await supabase
      .from('todos')
      .update({
        title,
        description,
        completed,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating todo:', error);
      throw error;
    }

    // Revalidate the homepage so the list refreshes
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw error;
  }
}

export async function getTodos(q: string | undefined | null = '') {
  let query = supabase
    .from('todos')
    .select('*')
    .order('updated_at', { ascending: true });

  if (q && q.trim()) {
    const term = q.trim();
    query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }

  return data ?? [];
}