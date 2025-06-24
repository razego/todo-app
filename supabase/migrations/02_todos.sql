create table if not exists public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  completed  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);