/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `tbl_client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_client_login_key` ON `tbl_client`(`login`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_login_key` ON `tbl_user`(`login`);
