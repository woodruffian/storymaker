import { desc } from 'drizzle-orm'
import { questions } from '../../database/schema'

export default defineEventHandler(() => {
  return useDb().select().from(questions).orderBy(desc(questions.questionId)).all()
})
