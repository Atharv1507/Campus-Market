import pool from "../config/db.js";

const createProductsTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS products(
            product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(100) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            category TEXT NOT NULL,
            condition TEXT NOT NULL,
            description TEXT,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR, 
            CONSTRAINT fk_user
            FOREIGN KEY(created_by) 
	        REFERENCES users(id)
	        ON DELETE CASCADE
        )
        `
        await pool.query(query)
        console.log("Products table created successfully")
    }
    catch (error) {
        console.error("Error creating Products table", error)
    }
}

export default createProductsTable;
