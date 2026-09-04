CREATE TABLE `questionGroups` (
	`questionGroupId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`questionGroupName` text(50),
	`helpText` text(1024),
	`templateId` integer,
	`dtCreated` integer,
	`dtUpdated` integer,
	`createdbyid` integer,
	`updatedbyid` integer,
	FOREIGN KEY (`templateId`) REFERENCES `templates`(`templateId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`questionId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`questionText` text(200),
	`questionHelpText` text(1024),
	`dtCreated` integer,
	`dtUpdated` integer,
	`createdbyid` integer,
	`updatedbyid` integer
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`templateId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`templateName` text(50),
	`dtCreated` integer,
	`dtUpdated` integer,
	`createdbyid` integer,
	`updatedbyid` integer
);
