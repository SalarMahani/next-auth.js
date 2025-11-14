CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" text,
	"password" text,
	"twoFactAuthActivated" boolean DEFAULT false,
	"twoFactAuthToken" text
);
