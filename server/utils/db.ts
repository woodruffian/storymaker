import Database from 'better-sqlite3'
import { resolve } from 'node:path'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import * as schema from '../database/schema'

let sqlite: Database.Database | undefined
let db: BetterSQLite3Database<typeof schema> | undefined

export function useDb() {
  if (!db) {
    const config = useRuntimeConfig()
    const databaseUrl = config.databaseUrl || './data/app.sqlite'

    sqlite = new Database(resolve(process.cwd(), databaseUrl))
    db = drizzle(sqlite, { schema })
  }

  return db
}