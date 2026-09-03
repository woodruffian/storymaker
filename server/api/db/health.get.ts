import { sql } from 'drizzle-orm'

export default defineEventHandler(() => {
  const db = useDb()
  const result = db.get<{ ok: number }>(sql`select 1 as ok`)

  return {
    ok: result?.ok === 1
  }
})