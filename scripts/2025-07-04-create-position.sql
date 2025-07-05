CREATE TABLE "positions" (
	"id" SERIAL NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "PK_positions" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "IX_positions_name" ON "positions" USING btree ("name");