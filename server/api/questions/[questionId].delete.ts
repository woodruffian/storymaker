import { eq } from 'drizzle-orm'
import { createError } from 'h3'
import { questions } from '../../database/schema'

export default defineEventHandler((event) => {
  const question = useDb().delete(questions).where(eq(questions.questionId, getQuestionId(event))).returning().get()

  if (!question) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Question not found'
    })
  }

  return question
})
