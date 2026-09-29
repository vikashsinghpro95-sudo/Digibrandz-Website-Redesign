import { createClient } from '@libsql/client';

export const turso = createClient({
  url: import.meta.env.VITE_TURSO_URL,
  authToken: import.meta.env.VITE_TURSO_TOKEN,
});

// Helper for formatting queries that return lists of objects
export const fetchAll = async (query, args = []) => {
  const result = await turso.execute({ sql: query, args });
  return result.rows;
};

// Helper for single object queries
export const fetchOne = async (query, args = []) => {
  const result = await turso.execute({ sql: query, args });
  return result.rows[0] || null;
};
