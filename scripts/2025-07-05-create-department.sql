CREATE TABLE "departments" (
	"id" SERIAL NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "PK_departments" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "IX_departments_name" ON "departments" USING btree ("name");