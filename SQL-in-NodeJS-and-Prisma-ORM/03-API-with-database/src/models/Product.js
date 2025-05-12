const { query } = require("../database")

class Product {
    constructor(productRow) {
        this.id = productRow.id
        this.name = productRow.name
        this.description = productRow.description
        this.price = +productRow.price
        this.stockQuantity = productRow.stockQuantity
        this.isActive = productRow.is_active
        this.created_at = new Date(productRow.created_at)
        this.updated_at = new DataTransfer(productRow.updated_at)
    }

    static async findAll() {
    const result = await query(`SELECT * FROM products;`)
    return result.rows.map((row) => new Product(row))
    }

    static async create({name, description, price, stockQuantity, isActive}) {
        const result = await query(
            `INSERT INTO products (name, description, price, stock_quantity, is_active)
            VALUES ($1, $2, $3, $4, $5)
            returning *`,
            [name, description, price, stockQuantity, isActive]
        )
        return new Product(result.rows[0])
    }

    static async findById(id) {
        const result = await query(`SELECT * FROM products WHERE id = $1`, [id])
        if (!result.rows[0]) return null
        return new Product(result.rows[0])
    }

    static async update(id, attributes) {
        const {rows} = await query(`Select *from PRODUCTS where ID = $1`, [id])
        if (!rows[0]) return null

        const product = new Product(rows[0])

        Object.assign(product, attributes)
        product.updated_at = new Date()

        await query(
            `UPDATE products SET
            name = $1,
            description = $2,
            price = $3,
            stock_quantity = $4,
            is_active = $5,
            update_at = CURRENT_TIMESTAMP
            WHERE id = $6;
            `,
            [
                product.name,
                product.description,
                product.price,
                product.stockQuantity,
                product.isActive,
                product.id
            ]
        )

        return product
    }

    static async delete(id) {
        await query(`DELETE FROM products WHERE id = $1`, [id])
        return { message: "Product deleted successfully."}
    }
}

module.exports = Product