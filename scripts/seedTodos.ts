import { es } from "@/lib/esClient";
import { supabase } from "@/lib/supabase";
import { Todo } from "@/types";

async function run() {
  try {
    console.log('Fetching todos from database...');
    
    // Fetch all todos from Supabase
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    if (!todos || todos.length === 0) {
      console.log('No todos found in database');
      return;
    }

    console.log(`Found ${todos.length} todos. Indexing to Elasticsearch...`);

    // Bulk index todos to Elasticsearch
    const result = await es.helpers.bulk({
      datasource: todos,
      onDocument(todo: Todo) {
        return {
          index: {
            _index: 'search-todos',
            _id: todo.id
          }
        };
      },
      onDrop(doc) {
        console.warn('Failed to index document:', doc.document);
      }
    });

    console.log('Seeding completed!');
    console.log(`Successfully indexed: ${result.successful}`);
    console.log(`Failed: ${result.failed}`);
    
    if (result.failed > 0) {
      console.log('Some documents failed to index. Check Elasticsearch logs for details.');
    }

  } catch (error) {
    console.error('Error seeding todos:', error);
    process.exit(1);
  }
}

run().catch(console.error);
