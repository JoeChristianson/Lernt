CREATE TABLE `t_post` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`text` text NOT NULL,
	`state` enum('DRAFT','SAVED','DELETED'),
	`createdOn` timestamp NOT NULL,
	`publishedOn` timestamp,
	CONSTRAINT `t_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `t_users` MODIFY COLUMN `email` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `t_users` MODIFY COLUMN `name` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `t_users` ADD `password` varchar(1000) NOT NULL;