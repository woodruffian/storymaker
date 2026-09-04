import { questions } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const body = await readQuestionCreateBody(event)
  const now = new Date()

  return useDb().insert(questions).values({
    ...body,
    dtCreated: now,
    dtUpdated: now
  }).returning().get()
})
