-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    CONSTRAINT "Message_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE
);
