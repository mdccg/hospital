import { createTables } from './src/config/db';

const run = async () => {
    await createTables();
}

run();