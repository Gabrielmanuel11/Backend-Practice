const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://postgres:12345@localhost:5432/node_postgres",
    max: 2,
})

async function openConnection() {
    const client = await pool.connect();

    const result = await client.query("SELECT 1 + 1 AS soma;");
    console.log(result.rows);

    setTimeout(() => {
        client.release();
        console.log("Closing connection...")
    }, 5000);
}

openConnection();
openConnection();