import pool from "../config/db.js";

const createAdsTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS ads(
            ad_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(100) NOT NULL,
            urgency TEXT NOT NULL,
            budget INTEGER  NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by VARCHAR, 
          -- Defining the relationship
            CONSTRAINT fk_user
            FOREIGN KEY(created_by) 
	        REFERENCES users(id)
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