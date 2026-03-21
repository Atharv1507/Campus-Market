import pool from "../config/db.js";

export const getAllProductsService = async () => {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
    return result.rows;
}

export const createProductService = async (title, price, category, condition, description, image_url, created_by) => {
    const result = await pool.query(
        'INSERT INTO products (title, price, category, condition, description, image_url, created_by) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, price, category, condition, description, image_url, created_by]
    )
    console.log("Created Product ", result.rows[0]);
    return result.rows[0];
}

export const deleteProductService = async (productId) => {
    console.log('Product id is:' + productId)
    const result = await pool.query('DELETE FROM products WHERE product_id=$1 RETURNING *', [productId])
    console.log("Deleted product id", productId)
    return result.rows[0];
}

export const updateProductService = async (productId, title, price, category, condition, description, image_url) => {
    const result = await pool.query(
        'UPDATE products SET title=$1, price=$2, category=$3, condition=$4, description=$5, image_url=$6 WHERE product_id=$7 RETURNING *',
        [title, price, category, condition, description, image_url, productId]
    )
    console.log("Updated product", result.rows[0]);
    return result.rows[0];
}
