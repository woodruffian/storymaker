import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const templates = sqliteTable('templates', {
	templateId: integer('templateId').primaryKey({ autoIncrement: true }),
	templateName: text('templateName', { length: 50 }),
	dtCreated: integer('dtCreated', { mode: 'timestamp_ms' }),
	dtUpdated: integer('dtUpdated', { mode: 'timestamp_ms' }),
	createdbyid: integer('createdbyid'),
	updatedbyid: integer('updatedbyid')
})

export const questionGroups = sqliteTable('questionGroups', {
	questionGroupId: integer('questionGroupId').primaryKey({ autoIncrement: true }),
	questionGroupName: text('questionGroupName', { length: 50 }),
	helpText: text('helpText', { length: 1024 }),
	templateId: integer('templateId').references(() => templates.templateId),
	dtCreated: integer('dtCreated', { mode: 'timestamp_ms' }),
	dtUpdated: integer('dtUpdated', { mode: 'timestamp_ms' }),
	createdbyid: integer('createdbyid'),
	updatedbyid: integer('updatedbyid')
})

export const questions = sqliteTable('questions', {
	questionId: integer('questionId').primaryKey({ autoIncrement: true }),
	questionText: text('questionText', { length: 200 }),
	questionHelpText: text('questionHelpText', { length: 1024 }),
	dtCreated: integer('dtCreated', { mode: 'timestamp_ms' }),
	dtUpdated: integer('dtUpdated', { mode: 'timestamp_ms' }),
	createdbyid: integer('createdbyid'),
	updatedbyid: integer('updatedbyid')
})