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