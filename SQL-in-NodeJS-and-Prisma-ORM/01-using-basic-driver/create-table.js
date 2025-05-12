const pg = require("pg");

const db = new pg.Client({
    connectionString: "postgres://postgres:12345@localhost:5432/node_postgres",
});

async function createTable() {
    await db.connect();

    const query = `
    CREATE TABLE IF NOT EXISTS "public"."pokemon"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255)
    );
    `;

    const result = await db.query(query);
    console.log(result);

    await db.end();
}

createTable();