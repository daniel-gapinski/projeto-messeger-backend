/*
  Warnings:

  - You are about to drop the `DirectMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DirectMessage" DROP CONSTRAINT "DirectMessage_friendId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DirectMessage" DROP CONSTRAINT "DirectMessage_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DirectMessage" DROP CONSTRAINT "DirectMessage_senderId_fkey";

-- DropTable
DROP TABLE "public"."DirectMessage";

-- CreateTable
CREATE TABLE "directMessages" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "directMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "directMessages" ADD CONSTRAINT "directMessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directMessages" ADD CONSTRAINT "directMessages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directMessages" ADD CONSTRAINT "directMessages_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
