import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// DELETE /api/todos/completed - Delete all completed todos
export async function DELETE() {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('completed', true);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting completed todos:', error);
    return NextResponse.json(
      { error: 'Failed to delete completed todos' },
      { status: 500 }
    );
  }
} 