-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "primary_color" TEXT,
    "secondary_color" TEXT,
    "terciary_color" TEXT,
    "whatsapp" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);
