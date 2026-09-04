import { createError, getRouterParam, readBody, type H3Event } from 'h3'

interface QuestionInput {
  questionText?: unknown
  questionHelpText?: unknown
  createdbyid?: unknown
  updatedbyid?: unknown
}

interface QuestionCreateBody {
  questionText: string
  questionHelpText?: string | null
  createdbyid?: number
  updatedbyid?: number
}

interface QuestionUpdateBody {
  questionText?: string | null
  questionHelpText?: string | null
  createdbyid?: number
  updatedbyid?: number
}

export function getQuestionId(event: H3Event) {
  const questionId = Number(getRouterParam(event, 'questionId'))

  if (!Number.isInteger(questionId) || questionId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Question id must be a positive integer'
    })
  }

  return questionId
}

export async function readQuestionCreateBody(event: H3Event): Promise<QuestionCreateBody> {
  const body = await readBody<QuestionInput>(event)
  const questionText = normalizeText(body.questionText, 'questionText', 200, true) as string

  return {
    questionText,
    questionHelpText: normalizeText(body.questionHelpText, 'questionHelpText', 1024),
    createdbyid: normalizeInteger(body.createdbyid, 'createdbyid'),
    updatedbyid: normalizeInteger(body.updatedbyid, 'updatedbyid')
  }
}

export async function readQuestionUpdateBody(event: H3Event): Promise<QuestionUpdateBody> {
  const body = await readBody<QuestionInput>(event)
  const values = {
    questionText: normalizeText(body.questionText, 'questionText', 200),
    questionHelpText: normalizeText(body.questionHelpText, 'questionHelpText', 1024),
    createdbyid: normalizeInteger(body.createdbyid, 'createdbyid'),
    updatedbyid: normalizeInteger(body.updatedbyid, 'updatedbyid')
  }
  const updates = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined)
  )

  if (Object.keys(updates).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'At least one question field is required'
    })
  }

  return updates
}

function normalizeText(value: unknown, fieldName: string, maxLength: number, required = false): string | null | undefined {
  if (value === undefined || value === null) {
    if (required) {
      throw createError({
        statusCode: 400,
        statusMessage: `${fieldName} is required`
      })
    }

    return undefined
  }

  if (typeof value !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: `${fieldName} must be a string`
    })
  }

  const text = value.trim()

  if (required && !text) {
    throw createError({
      statusCode: 400,
      statusMessage: `${fieldName} is required`
    })
  }

  if (text.length > maxLength) {
    throw createError({
      statusCode: 400,
      statusMessage: `${fieldName} cannot be longer than ${maxLength} characters`
    })
  }

  return text || null
}

function normalizeInteger(value: unknown, fieldName: string): number | undefined {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value !== 'number' || !Number.isInteger(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: `${fieldName} must be an integer`
    })
  }

  return value
}
