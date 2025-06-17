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

export async function toggleTodo(formData: FormData) {
  try {
    const id = String(formData.get('id'));
    const completedStr = String(formData.get('completed'));
    const completed = completedStr === 'true';
    
    const { error } = await supabase
      .from('todos')
      .update({ completed: !completed })
      .eq('id', id);
    
    if (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
    
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to toggle todo:', error);
    throw error;
  }
}

export async function deleteTodo(formData: FormData) {
  try {
    const id = String(formData.get('id'));
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
    
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw error;
  }
} 