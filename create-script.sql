-- DROP TABLE IF EXISTS "beneficiary", "appointment", "exam"; 

CREATE TABLE IF NOT EXISTS "beneficiary" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "birthDate" DATE NOT NULL,
    "email" VARCHAR,
    "phone" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "appointment" (
    "id" SERIAL PRIMARY KEY,
    "specialty" VARCHAR NOT NULL,
    "doctorName" VARCHAR NOT NULL,
    "dateTime" TIMESTAMP NOT NULL,
    "idBeneficiary" INTEGER REFERENCES "beneficiary" ("id")
);

CREATE TABLE IF NOT EXISTS "exam" (
    "id" SERIAL PRIMARY KEY,
    "specialty" VARCHAR NOT NULL,
    "responsibleProfessional" VARCHAR NOT NULL,
    "dateTime" TIMESTAMP NOT NULL,
    "idBeneficiary" INTEGER REFERENCES "beneficiary" ("id"),
    "urgencyCharacter" BOOLEAN DEFAULT false
);