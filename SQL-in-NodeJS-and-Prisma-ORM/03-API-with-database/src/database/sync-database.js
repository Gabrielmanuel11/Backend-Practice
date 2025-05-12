const { query } = require("./index");

async function syncDatabase() {
    //Create products
    await query(`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock_quantitty INT NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATE_AT Timestamp default current_timestamp,
        IS_ACTIVE boolean default true
        );
    `);
    console.log('Created "products" table.');

    //Create customers
    await query(`
        CREATE TABLE IF NOT EXISTS customers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Created "customers" table.');

    //Create orders
    await query(`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          customer_id INT NOT NULL,
          total DECIMAL(10, 2) NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (customer_id) REFERENCES customers (id)
        );
      `);
      console.log('Created "orders" table.');

    //Relationship orders & products
    await query(`
        CREATE TABLE IF NOT EXISTS order_products (
          order_id INT,
          product_id INT,
          quantity INT NOT NULL DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (order_id, product_id),
          FOREIGN KEY (order_id) REFERENCES orders (id),
          FOREIGN KEY (product_id) REFERENCES products (id)
        );
      `);
      console.log('Created "order_products" table.');

    process.exit(1);
}

syncDatabase();