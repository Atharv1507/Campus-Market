    CREATE TABLE IF NOT EXISTS users(
        id VARCHAR PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at  TIMESTAMP DEFAULT now() 
    )


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