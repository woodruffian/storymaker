import { eq } from 'drizzle-orm'
import { createError } from 'h3'
import { questions } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const questionId = getQuestionId(event)
  const body = await readQuestionUpdateBody(event)
  const question = useDb().update(questions).set({
    ...body,
    dtUpdated: new Date()
  }).where(eq(questions.questionId, questionId)).returning().get()

  if (!question) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Question not found'
    })
  }

  return question
})
