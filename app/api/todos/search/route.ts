import { es } from '@/lib/esClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (!q) {
    return NextResponse.json([], { status: 200 });
  }

  const { hits } = await es.search({
    index: 'search-todos',
    size: 50,
    query: {
      bool: {
        should: [
          // Exact phrase matches (highest priority)
          { 
            match_phrase: { 
              title: { 
                query: q, 
                boost: 3.0 
              } 
            } 
          },
          { 
            match_phrase: { 
              description: { 
                query: q, 
                boost: 2.0 
              } 
            } 
          },
          
          // Fuzzy matches (handle typos)
          { 
            match: { 
              title: { 
                query: q, 
                fuzziness: 'AUTO',
                boost: 2.5
              } 
            } 
          },
          { 
            match: { 
              description: { 
                query: q, 
                fuzziness: 'AUTO',
                boost: 1.5
              } 
            } 
          },
          
          // Prefix matches (autocomplete-style)
          { 
            match_phrase_prefix: { 
              title: { 
                query: q,
                boost: 2.0
              } 
            } 
          },
          { 
            match_phrase_prefix: { 
              description: { 
                query: q,
                boost: 1.0
              } 
            } 
          },
          
          // Wildcard fallback
          { 
            wildcard: { 
              title: { 
                value: `*${q.toLowerCase()}*`,
                boost: 1.0
              } 
            } 
          },
          { 
            wildcard: { 
              description: { 
                value: `*${q.toLowerCase()}*`,
                boost: 0.5
              } 
            } 
          }
        ],
        minimum_should_match: 1
      }
    }
  });

  const results = hits.hits.map(h => ({
    id:        h._id,
    ...(h._source as Record<string, any>)
  }));

  return NextResponse.json(results);
}
