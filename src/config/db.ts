import { Pool } from 'pg';

const sqlPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'plano-saude',
    user: 'postgres',
    password: 'postgres'
});

export const createTables = async () => {
    const client = await sqlPool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`CREATE TABLE IF NOT EXISTS "beneficiary" (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "birthDate" DATE NOT NULL,
            "email" VARCHAR,
            "phone" VARCHAR NOT NULL
        );`);

        await client.query(`CREATE TABLE IF NOT EXISTS "appointment" (
            "id" SERIAL PRIMARY KEY,
            "specialty" VARCHAR NOT NULL,
            "doctorName" VARCHAR NOT NULL,
            "dateTime" TIMESTAMP NOT NULL,
            "idBeneficiary" INTEGER REFERENCES "beneficiary" ("id")
        );`);

        await client.query(`CREATE TABLE IF NOT EXISTS "exam" (
            "id" SERIAL PRIMARY KEY,
            "specialty" VARCHAR NOT NULL,
            "responsibleProfessional" VARCHAR NOT NULL,
            "dateTime" TIMESTAMP NOT NULL,
            "idBeneficiary" INTEGER REFERENCES "beneficiary" ("id"),
            "urgencyCharacter" BOOLEAN DEFAULT false
        );`);

        await client.query('COMMIT');

    } catch(pigeon) {
        await client.query('ROLLBACK');
    
    }

    console.log('Eu juro solenemente não fazer nada de bom. o/**');
    client.release();
}

export const executeQuery = async (query: string, values?: any[]) => {
    const result = values ? await sqlPool.query(query, values) : await sqlPool.query(query);
    return result;
}

process.on('SIGINT', async () => {
    await sqlPool.end();
    console.log('Malfeito feito. o/**');
});