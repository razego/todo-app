// shared across multiple components
export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoUpdateData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
} 