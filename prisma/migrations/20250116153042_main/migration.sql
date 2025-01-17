-- CreateTable
CREATE TABLE "Wisata" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kunjungan" INTEGER NOT NULL,
    "telepon" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "sampul" TEXT NOT NULL,
    "galeri" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wisata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "komentarId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komentar" (
    "id" TEXT NOT NULL,
    "userTempId" TEXT NOT NULL,
    "wisataId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Komentar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wisata_slug_key" ON "Wisata"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Komentar_userTempId_key" ON "Komentar"("userTempId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_komentarId_fkey" FOREIGN KEY ("komentarId") REFERENCES "Komentar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_wisataId_fkey" FOREIGN KEY ("wisataId") REFERENCES "Wisata"("id") ON DELETE CASCADE ON UPDATE CASCADE;
