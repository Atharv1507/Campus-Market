import pool from "../config/db.js";

const createAdsTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS users(
            id VARCHAR PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR, 
          -- Defining the relationship
            CONSTRAINT fk_user
            FOREIGN KEY(userid) 
	        REFERENCES users(userid)
	        ON DELETE CASCADE
        )
        `
        await pool.query(query)
        console.log("Ads table created successfully")
    }
    catch (error) {
        console.error("Error creating Ads table", error)
    }
}

export default createAdsTable  