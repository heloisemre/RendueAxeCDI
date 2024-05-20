-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `lastBooster` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,
    `cardName` VARCHAR(191) NOT NULL,
    `cardSlug` VARCHAR(191) NOT NULL,
    `cardEyes` VARCHAR(191) NOT NULL,
    `cardHairs` VARCHAR(191) NOT NULL,
    `cardBirthday` VARCHAR(191) NOT NULL,
    `cardBlood` VARCHAR(191) NOT NULL,
    `cardWand` VARCHAR(191) NULL,
    `cardPatronus` VARCHAR(191) NULL,
    `cardRole` VARCHAR(191) NOT NULL,
    `cardHouse` VARCHAR(191) NULL,
    `cardActor` VARCHAR(191) NOT NULL,
    `cardImage` VARCHAR(191) NOT NULL,
    `obtained` BOOLEAN NOT NULL DEFAULT false,
    `liked` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
