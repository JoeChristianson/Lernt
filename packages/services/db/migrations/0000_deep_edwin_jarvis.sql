CREATE TABLE `t_accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `t_credentials` (
	`user_id` varchar(36) NOT NULL,
	`hash` varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `t_user_configs` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`theme` enum('light','dark') NOT NULL,
	CONSTRAINT `t_user_configs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `t_users` (
	`id` varchar(255) NOT NULL,
	`email` varchar(100),
	`email_verified` timestamp,
	`name` varchar(100),
	`image` varchar(100),
	CONSTRAINT `t_users_id` PRIMARY KEY(`id`)
);
