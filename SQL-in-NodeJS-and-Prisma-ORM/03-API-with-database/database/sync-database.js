const { query } = require("./index");

async function syncDatabase() {
    await query(`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOTNULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock_quantitty INT NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATE_AT Timestamp default current_timestamp,
        IS_ACTIVE boolean default true
        );
    `);
    console.log('Created "products" table.');
    process.exit(1);
}

syncDatabase();