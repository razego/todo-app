// scripts/createIndex.ts
import { es } from "@/lib/esClient";

async function createIndex() {
  try {
    // Check if index exists and delete it if it does
    const indexExists = await es.indices.exists({ index: 'search-todos' });
    
    if (indexExists) {
      console.log('Index already exists. Deleting it first...');
      await es.indices.delete({ index: 'search-todos' });
      console.log('Index deleted successfully.');
    }

    const response = await es.indices.create({
      index: 'search-todos',
      settings: {
        analysis: {
          tokenizer: {
            edge_ngram_tokenizer: {
              type: 'edge_ngram',
              min_gram: 2,
              max_gram: 20,
              token_chars: ['letter', 'digit']
            }
          },
            analyzer: {
              edge_ngram_analyzer: {
                type: 'custom',
                tokenizer: 'edge_ngram_tokenizer',
                filter: ['lowercase']
              }
            }
        }
      },
      mappings: {
        properties: {
          title: {
            type: 'text',
            analyzer: 'edge_ngram_analyzer',
            search_analyzer: 'standard'
          },
          description: {
            type: 'text',
            analyzer: 'edge_ngram_analyzer',
            search_analyzer: 'standard'
          },
          completed: {
            type: 'boolean'
          }
        }
      }
    });

    console.log('Index created:', {
      acknowledged: response.acknowledged,
      shards_acknowledged: response.shards_acknowledged,
      index: response.index
    });
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

createIndex();
