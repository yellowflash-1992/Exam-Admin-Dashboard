-- CreateTable
CREATE TABLE "Examination" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "dateLabel" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "candidateNo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationCentre" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "capacity" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExaminationCentre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationRegistration" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "examinationId" INTEGER NOT NULL,
    "centreId" INTEGER,
    "registrationNo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'registered',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExaminationRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "examinationId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION,
    "grade" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Examination_name_key" ON "Examination"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Examination_code_key" ON "Examination"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_candidateNo_key" ON "Candidate"("candidateNo");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationCentre_code_key" ON "ExaminationCentre"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationRegistration_candidateId_examinationId_key" ON "ExaminationRegistration"("candidateId", "examinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_candidateId_examinationId_key" ON "Result"("candidateId", "examinationId");

-- AddForeignKey
ALTER TABLE "ExaminationRegistration" ADD CONSTRAINT "ExaminationRegistration_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationRegistration" ADD CONSTRAINT "ExaminationRegistration_examinationId_fkey" FOREIGN KEY ("examinationId") REFERENCES "Examination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationRegistration" ADD CONSTRAINT "ExaminationRegistration_centreId_fkey" FOREIGN KEY ("centreId") REFERENCES "ExaminationCentre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_examinationId_fkey" FOREIGN KEY ("examinationId") REFERENCES "Examination"("id") ON DELETE CASCADE ON UPDATE CASCADE;
